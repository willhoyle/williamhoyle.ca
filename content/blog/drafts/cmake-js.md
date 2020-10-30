---
title: 'how to write a c++ node addon with cmake-js and node-addon-api module'
publishedAt: 2019-11-12
categories: ['tutorial']
languages: ['javascript', 'node.js', 'c++']
tags: ['napi', 'financialcpp']
---

# how to write a c++ node addon api with cmake-js and node-addon-api module

In this tutorial, I'll show how to build a c++ node addon with cmake-js and node-addon-api module by using [financialcpp](https://financialcpp.com) as an example package. Hopefully these notes can help someone figure it out for their own application.

> [financialcpp](https://financialcpp.com) is a high performance stock market framework written in c++. I aim to provide a friendly, intuitive API with amazing documentation. It's currently in active development.

---

One thing to keep in mind is the end-user installing your library (with `npm install <packagename>`) will need the following:

- node >= v8.0.0
- CMake
- a decent c++ compiler toolchain:
  - Windows:
    Visual C++ Build Tools or a recent version of Visual C++ will do (the free Community version works well)
  - Unix/Posix:
    Clang or GCC
    Ninja or Make (Ninja will be picked if both present)

`cmake-js` uses the user's cmake and compiler toolchain to compile your c++ code into a node addon.

## CMakeLists.txt

Let's start by creating our CMakeLists.txt file containing the following:

```cmake
cmake_minimum_required(VERSION 2.8)

# Name of the project (will be the name of the plugin)
# In my case, I want my npm package to be called financialcpp
project(financialcpp)

# Build a shared library named after the project from the files in `src/`
file(GLOB SOURCE_FILES "src/*.cc" "src/*.h")
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})

# Gives our library file a .node extension without any "lib" prefix
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# Essential include files to build a node addon,
# You should add this line in every CMake.js based project
target_include_directories(${PROJECT_NAME} PRIVATE ${CMAKE_JS_INC})

# Essential library files to link to a node addon
# You should add this line in every CMake.js based project
target_link_libraries(${PROJECT_NAME} ${CMAKE_JS_LIB})

# Include N-API wrappers
# $ node -p "require('node-addon-api').include"
# "/home/will/projects/financialcpp/financialcpp/node_modules/node-addon-api"
execute_process(COMMAND node -p "require('node-addon-api').include"
        WORKING_DIRECTORY ${CMAKE_SOURCE_DIR}
        OUTPUT_VARIABLE NODE_ADDON_API_DIR
        )

# strip `"` and `\n` from the output above
string(REPLACE "\n" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})
string(REPLACE "\"" "" NODE_ADDON_API_DIR ${NODE_ADDON_API_DIR})

target_include_directories(${PROJECT_NAME} PRIVATE ${NODE_ADDON_API_DIR})
```

Your project will most likely be a bit more complicated than one CMakeLists.txt. You can use `CMAKE_JS_VERSION` to target your node_addon directory:

```cmake
if (CMAKE_JS_VERSION)
    add_subdirectory(node_addon)
else()
    add_subdirectory(other_subproject)
endif()
```

## nodejs

Let's install the necessary packages first:

```bash
npm install --save bindings cmake-js nan
npm install --save-dev node-addon-api
```

Add the following fields to your `package.json`:

```json
{
  "scripts": {
    "install": "cmake-js compile --debug"
  },
  "main": "js/main.js"
}
```

With the previous command we'll be able to compile our node package with `npm run install`.

`js/main.js` will be our entrypoint when users import our module like so:

```js
import financialcpp from 'financialcpp'
financialcpp.download({ symbol: 'AAPL' })
```

```js
// js/main.js

var financialcpp = require('bindings')('financialcpp')

financialcpp.my_example_function = function(a, b) {
  return a + b
}

module.exports = financialcpp // Just reexport it
```

What you're doing here is the `bindings` package is importing our financialcpp.node c++ addon. We then export it as the default export so that users can import it and use the object directly. `financialcpp` is just a regular object, we can extend it with more functions and functionality as you can see above with the `my_example_function`. This is all great and fun but what we're really interested in is accessing functions, properties, memory that we created in our c++ source code.

For that we need node-addon-api module.

# node-addon-api module

We already installed it in our devDependencies. Let's create a simple addon.cc file as follows (this is from one of their examples):

```c++
// src/addon.cc

#include <napi.h>

Napi::Promise SumAsyncPromise(const Napi::CallbackInfo &info)
{
    Napi::Env env = info.Env();

    //
    // IMPORTANT!
    //
    // Node.js will process the fulfillment/conclusion of the `Promise` in an
    // asynchronous fashion (compared to "real-time" in JavaScript) because the
    // fulfillment is added to the event loop's "`Promise` fulfillment microtask
    // queue", which is processed immediately after the "`nextTick` microtask
    // queue", even when it is fulfilled synchronously in C++.
    //
    // If this ever becomes UNTRUE, then you would need to utilize an
    // `AsyncWorker` (or a similar concept) in order to ensure this
    // `Promise` is fulfilled asynchronously.
    //
    auto deferred = Napi::Promise::Deferred::New(env);

    if (info.Length() != 2)
    {
        deferred.Reject(
            Napi::TypeError::New(env, "Invalid argument count").Value());
    }
    else if (!info[0].IsNumber() || !info[1].IsNumber())
    {
        deferred.Reject(
            Napi::TypeError::New(env, "Invalid argument types").Value());
    }
    else
    {
        double arg0 = info[0].As<Napi::Number>().DoubleValue();
        double arg1 = info[1].As<Napi::Number>().DoubleValue();
        Napi::Number num = Napi::Number::New(env, arg0 + arg1);

        deferred.Resolve(num);
    }

    return deferred.Promise();
}

#include <napi.h>

/**
 * Method to get the version of ImageMagick.
 **/
Napi::Value ProcessImage(const Napi::CallbackInfo &info)
{

    /**
   * Get the Data from the JS engine.
   **/
    auto env = info.Env();

    /**
   *  Should validate and not crash the process. This is C++.
   * There is no process.on('uncaughtException') here.
   **/
    if (info.Length() < 1)
    {
        // Throw exceptions in a synchronous method. return error as first argument if callback.
        // If returning promises, reject. Follow conventions.
        Napi::TypeError::New(env, "Need at least one argument.").ThrowAsJavaScriptException();

        // Always return even if you throw. The C++ execution needs a return statement.
        return env.Null();
    }

    // Can check for all JS types - https://nodejs.github.io/node-addon-api/class_napi_1_1_value.html
    if (!info[0].IsBoolean())
    {
        Napi::TypeError::New(env, "Need a Node.js Buffer as an argument.").ThrowAsJavaScriptException();
        return env.Null();
    }

    // All JS types are available. JS is not Ruby. Everything is not an object.
    // See https://nodejs.github.io/node-addon-api/class_napi_1_1_value.html for the inheritance chart.
    auto my_bool = info[0].As<Napi::Boolean>();

    /**
   *  Processing in ImageMagick.
   **/

    // Create a imagemagick image object
    double width = 2.01;
    double height = 3.02;

    /**
   * Returning the data to JavaScript
   **/

    /**
   * let obj = {
   *    width: width,
   *    height: height,
   *
   * };
   * return obj;
   **/
    Napi::Object obj = Napi::Object::New(env);
    // Simple properties
    // An object is a key value map where both keys and values can be anything.
    obj.Set(Napi::String::New(env, "width"), Napi::Number::New(env, width));
    obj.Set(Napi::String::New(env, "height"), Napi::Number::New(env, height));

    return obj;
}

/**
 * Export Init as a module to Node.js
 * Equivalent to `init(module.exports);`
 **/

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set(
        Napi::String::New(env, "add"),
        Napi::Function::New(env, SumAsyncPromise));

    exports.Set(Napi::String::New(env, "processImage"), Napi::Function::New(env, ProcessImage));

    return exports;
}

NODE_API_MODULE(addon, Init)
```

You'll notice that you need to set all your exports inside the Init function. This is where you should
