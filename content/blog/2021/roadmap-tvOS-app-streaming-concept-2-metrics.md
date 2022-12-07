---
title: "Brainstorm: tvOS app to stream Concept 2 metrics to my TV"
---

# Brainstorm: tvOS app to stream Concept 2 metrics to my TV
[[date]]

[[toc]]

I'm at the conceptual stage of an idea. When I don't have time to work on an idea but want to capture that initial spark ⚡, I write myself a todo list/guide. I can then quickly jump in on a slow weekend. This guide is my roadmap to facilitate this idea.

I recently started rowing with a Concept 2 rower (PM5) which has a bluetooth interface. The rower can stream real-time metrics with this interface.

![Pic of my rower](/concept-2.jpg)

I looked around and didn't find any native tvOS apps taking advantage of this. How I envision this working is connecting the Concept 2 to the Apple TV via bluetooth and streaming rowing metrics to the screen. I'll start with that for v0.1 and go from there. Maybe v0.2 streams content to the screen. I have some ideas for streams. The app could stream classes or cool stuff like what Zwyft does.

So that's the project. Now, how do I get to that v0.1. This guide will attempt to list out all the steps to v0.1 (and some of v0.2).

## Project goals: v0.1
Goal: A tvOS app that can connect to the Concept 2 bluetooth interface and display real-time information to the TV.

## Breaking it all down

The stated goal above will have to be broken down into nice little chunks of work. If you ever feel stuck with a seemingly daunting task in front of you, do this. I highly recommend this method. For me, the tasks that give me the biggest blocks are when I know there's going to be so much annoying yak-shaving involved before I can even see results. Does anyone else have PTSD from yak-shaving? I'm traumatized, seriously. 😂 Breaking it down like this and doing some pre-project research can reduce mistakes and increases the quality of the effort for free.

### macOS development environment for tvOS

I don't own a mac. But my partner does, and she's agreed to let me put the behemoth that is Xcode and I'm sure a bunch of other crap on her mac.

Alright first off. Let's not be dumb here. Check google if someone has already written a guide or if we can piece things together that way. No need to reinvent the wheel.

I'm back and wow I think I just saved myself so much time. It took me about 5 minutes to find the following tutorial course by hackingwithswift.com: [https://www.hackingwithswift.com/store/hacking-with-tvos](https://www.hackingwithswift.com/store/hacking-with-tvos)

I read the sample chapter and instantly whipped my wallet out. No sense reinventing the wheel. Paul Hudson, the author, is a beast programmer too so why not? Best $50.45CAD ever spent.

#### Download Xcode
[https://apps.apple.com/us/app/xcode/id497799835?mt=12](https://apps.apple.com/us/app/xcode/id497799835?mt=12)

### Skim the Swift crash course chapter
I don't know Swift but I'm sure I'll pick it up as we go. 

#### Project 1
Looks like it gets us started with an app. We display a picture at the top and a list selector thing under it.

There's a couple more screens. Looks like we'll learn about how to use Xcode and how everything fits together, and JSON lmao. I actually love Paul Hudson's teaching style. Just assumes you know nothing.

Skimming this so far, it seems like after Project 1, I'll be able to display my metrics on the screen. 


#### Project 2
Project 2 doesn't look as useful. I won't follow it as closely but grab some ideas from it.

#### Project 3: Focus
This will be useful to learn how to react to the remote moving from item to item. 


### Bluetooth
At this point, we can display stuff on the screen and refresh it when we get new data. We know how to make an API call to a remote API (and consume it with a JSON library). We need to move on to the next step: Bluetooth. 

The book has zero references to bluetooth but that's okay. I think at this point I can write just enough Swift code to be dangerous.

I'm gonna pull this lib in: [https://github.com/BoutFitness/Concept2-SDK](https://github.com/BoutFitness/Concept2-SDK). Looks like just what I need. Last commit 2015 but why wouldn't it work?

Wow this library is so clean. It has completely abstracted away the Bluetooth and Concept 2 boilerplate code. Look, at this rich list of metrics!

```swift
 // MARK: Rowing Information
  public let averageCalories = Subject<C2CalorieCount>(value: 0)
  public let averageDriveForce = Subject<C2DriveForce>(value: 0)
  public let averageHeartRate = Subject<C2HeartRate>(value: 0)
  public let averagePace = Subject<C2Pace>(value: 0)
  public let averageStrokeRate = Subject<C2StrokeRate>(value: 0)
  public let currentPace = Subject<C2Pace>(value: 0)
  public let distance = Subject<C2Distance>(value: 0)
  public let dragFactor = Subject<C2DragFactor>(value: 0)
  public let dragFactorAverage = Subject<C2DragFactor>(value: 0)
  public let driveLength = Subject<C2DriveLength>(value: 0)
  public let driveTime = Subject<C2DriveTime>(value: 0)
  public let elapsedTime = Subject<C2TimeInterval>(value: 0)
  public let endingHeartRate = Subject<C2HeartRate>(value: 0)
  public let heartRate = Subject<C2HeartRate>(value: 0)
  public let intervalAverageCalories = Subject<C2CalorieCount>(value: 0)
  public let intervalAveragePace = Subject<C2Pace>(value: 0)
  public let intervalAveragePower = Subject<C2Power>(value: 0)
  public let intervalAverageStrokeRate = Subject<C2StrokeRate>(value: 0)
  public let intervalCount = Subject<C2IntervalCount>(value: 0)
  public let intervalDistance = Subject<C2Distance>(value: 0)
  public let intervalNumber = Subject<C2IntervalCount>(value: 0)
  public let intervalPower = Subject<C2Power>(value: 0)
  public let intervalRestDistance = Subject<C2Distance>(value: 0)
  public let intervalRestHeartrate = Subject<C2HeartRate>(value: 0)
  public let intervalRestTime = Subject<C2TimeInterval>(value: 0)
  public let intervalSize = Subject<C2IntervalSize>(value: 0)
  public let intervalSpeed = Subject<C2Speed>(value: 0)
  public let intervalTime = Subject<C2TimeInterval>(value: 0)
  public let intervalTotalCalories = Subject<C2CalorieCount>(value: 0)
  public let intervalType = Subject<IntervalType?>(value: nil)
  public let intervalWorkHeartrate = Subject<C2HeartRate>(value: 0)
  public let lastSplitDistance = Subject<C2Distance>(value: 0)
  public let lastSplitTime = Subject<C2TimeInterval>(value: 0)
  public let maximumHeartRate = Subject<C2HeartRate>(value: 0)
  public let minimumHeartRate = Subject<C2HeartRate>(value: 0)
  public let peakDriveForce = Subject<C2DriveForce>(value: 0)
  public let projectedWorkDistance = Subject<C2Distance>(value: 0)
  public let projectedWorkTime = Subject<C2TimeInterval>(value: 0)
  public let recoveryHeartRate = Subject<C2HeartRate>(value: 0)
  public let restDistance = Subject<C2Distance>(value: 0)
  public let restTime = Subject<C2TimeInterval>(value: 0)
  public let rowingState = Subject<RowingState?>(value: nil)
  public let sampleRate = Subject<RowingStatusSampleRateType?>(value: nil)
  public let speed = Subject<C2Speed>(value: 0)
  public let splitAverageDragFactor = Subject<C2DragFactor>(value: 0)
  public let strokeCalories = Subject<C2CalorieCount>(value: 0)
  public let strokeCount = Subject<C2StrokeCount>(value: 0)
  public let strokeDistance = Subject<C2Distance>(value: 0)
  public let strokePower = Subject<C2Power>(value: 0)
  public let strokeRate = Subject<C2StrokeRate>(value: 0)
  public let strokeRecoveryTime = Subject<C2TimeInterval>(value: 0)
  public let strokeState = Subject<StrokeState?>(value: nil)
  public let totalCalories = Subject<C2CalorieCount>(value: 0)
  public let totalRestDistance = Subject<C2Distance>(value: 0)
  public let totalWorkDistance = Subject<C2Distance>(value: 0)
  public let watts = Subject<C2Power>(value: 0)
  public let workoutDuration = Subject<C2TimeInterval>(value: 0)
  public let workoutDurationType = Subject<WorkoutDurationType?>(value: nil)
  public let workoutState = Subject<WorkoutState?>(value: nil)
  public let workoutType = Subject<WorkoutType?>(value: nil)
  public let workPerStroke = Subject<C2Work>(value: 0)
```

I'm not a rower so I don't know what all these are used for but I'm sure the pros are squeezing out every last bit of performance from data like this.

It looks like I'll be able to do stuff like this to tap into these metrics:

```swift
var strokesPerMinuteDisposable:Disposable?
var distanceDisposable:Disposable?

// ...

strokesPerMinuteDisposable = performanceMonitor?.strokeRate.attach({
  [weak self] (strokeRate:C2StrokeRate) -> Void in
  if let weakSelf = self {
    dispatch_async(dispatch_get_main_queue(), { () -> Void in
      weakSelf.strokesPerMinuteLabel.text = "\(strokeRate)"
    })
  }
})

distanceDisposable = performanceMonitor?.distance.attach({
  [weak self] (distance:C2Distance) -> Void in
  if let weakSelf = self {
    dispatch_async(dispatch_get_main_queue(), { () -> Void in
      weakSelf.distanceLabel.text = "\(distance)"
    })
  }
})
```

So clean and easy wow. So I'm assuming what will happen is inside these callback functions, I'll call the "view" to change metrics on the screen. I don't know the iOS lingo yet but that makes sense in my head.

Looking up what a `Disposable` is. Seems to be related to RxSwift. Is that like Redux/Vuex pattern? Probably. 

This was useful.
[https://learnappmaking.com/escaping-closures-swift/](https://learnappmaking.com/escaping-closures-swift/)

While we're at it: [Swift Docs](https://docs.swift.org/swift-book/ReferenceManual/AboutTheLanguageReference.html)



## Project goals: v0.2

At this stage, I should have a fully running app showing workout metrics. What should I do now? I haven't decided yet. The screen will be split in two: Right side for metrics, left for content.

v0.2 sees this app evolve to something bigger. Where I can use it as playground to build new app ideas and use them while I'm rowing. Since I can't interact with the remote, it will force me to come up with a good way of displaying passive but useful content. With 0 user interactions, you just have to focus on creating captivating and beautiful content.

### Ideas for content

- Stream chess matches (live or historical). Show Blitz games as it happened in real-time.
- Show chess lessons (5 minute quick lessons on an opening or a tactic)
- Zwyft/Peloton style. Guided workout or even scenic row through the mountains
- History page for past workouts
- Anki deck style knowledge question and answer. Like showing the map of a world and naming the highlighted country
- Cool graphics (like a power meter charging up and sparking when you burst row)
- Cool line charts!

### Features I won't add

- Sync workout to server. Concept 2 has an app that solves this already so no need to add this. Just open the app and sync the usual way. This tvOS app shouldn't get involved in that. 

That's the plan. This will give me a good base for tvOS apps too. Always good to keep exposing yourself to new languages and paradigms.