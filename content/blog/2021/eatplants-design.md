---
title: Code sprint for eatplants.app
---
# Code sprint for eatplants.app

[eatplants.app](https://eatplants.app) is a plant-based food tracking app without the food tracking

[[toc]]

Check out the first prototype here that came out of this sprint: [eatplants.app](https://eatplants.app)
## Intro
The goal of this exercise is to go from conceptual stage (ie. "just an idea") to an actual working prototype in a day. It's not going to be perfect but it's nice to just build stuff sometimes without necessarily worrying that it's the perfect design.

## Step 1: Requirements/Features
What do I want this app to do for me? What problem am I solving for myself?

**Requirements**: 
- I want to be able to go to eatplants.app
- Browse a collection of recipes and foods I will eat
- Collections are an ensemble of collections, recipes, and food items
- Collections in theory should be a cohesive group of food items (to simplify grocery shopping)
- Collections can be themed by cuisine type or by some other tag system
- Enter my nutrient requirements on a per-day basis (for example, I want to eat 2000 calories Monday, 2500 Tuesday, etc...)
- Based on the nutrient requirements from above, calculate how much of each recipe/food I should eat
- Be able to say, I want to eat collection-1 Monday, collection-2 Tuesday, etc... for the week. Analyze to make sure nutrients are balanced
- Spit out a grocery list for those food items
- No food tracking. Everyone hates it.  Encourage intuitive eating and **sustainable lifestyle**
- Ideally, this site is collaborative. Other users can create collections and share the publicly
- The ultimate goal is to reduce the mental burden in planning plant-based meals, deciding what I need to buy, etc...
- Discourage long-winded SEO garbage recipe pages. You know the ones. One picture, small description. I hate these bloated Wordpress blogs with a passion

## Step 2: Scaffolding
This is by far the worse part of any project. I need to gather and setup all the software components before even starting.

Here's the stack I will use:

- PostgreSQL
- [Nuxt](nuxtjs.org) framework (can statically generate recipe pages)
- [Buefy](https://buefy.org/) for frontend components (built on top of the clean Bulma CSS framework)
- Hosting: [netlify.com](netlify.com) for homepage
- Hosting: [digitalocean.com](digitalocean.com) for db and api
- [Graphile](https://www.graphile.org/): API layer sitting in front of the database
  - it will create a nice graphql api from views and tables created in the db. Such a nice workflow
- Custom user account system: In db with salted+hashed passwords. No Google or FB sign-in (don't want those data leeches near this app at all)
- Docker/docker-compose for development and production
- Initial food and nutrient entries come from USDA website (csv files). I don't want any non-vegan products in this at all, so a bit of cleaning up is required

## Step 3: Database design
Now that everything is setup, it's time to see how the requirements above will map to a database structure that is easy to query.

##### Common columns
```sql
All tables will have these:
created_at timestamptz default now(),
updated_at timestamptz default now()
```
##### Implied triggers
```sql
-- updated_at triggers for each table
create or replace function app_private.set_updated_at ()
    returns trigger
    as $$
begin
    new.updated_at := now();
    return new;
end;
```
##### Users
```sql
create table app_private.person (
    id smallint primary key generated always as identity, 
    email text not null unique check (email ~* '^.+@.+\..+$'),
    username text unique, -- for sharing and page links
    password_hash text not null,
    role_name text not null
);
```

##### Food Group
```sql
create table app.food_group (
    id smallint primary key generated always as identity, 
    -- don't think we'll need more than 32767 food groups lol
    name text
);
```
##### Food (Carrot, Potato, etc...)
```sql
create table app.food (
    id integer primary key generated always as identity,
    food_group_id integer references(app.food_group.id),
    long_description text,
    short_description text,
    common_name text
);
```
##### Nutrient (Protein, Carbs, Iron, etc...)
```sql
create table app.nutrient (
    id integer primary key generated always as identity,
    unit text, -- g, mg, ml etc...
    name text -- protein
);
```
##### Food Nutrient (amount of nutrient per g and kcal)
```sql
create table app.food_nutrient (
    nutrient_id integer references(app.nutrient.id),
    food_id integer references(app.food.id),
    value_per_g real,
    value_per_kcal real,
    primary key (nutrient_id, food_id)
);
```
##### Food Measure Weight (how much does a cup of dried lentils weigh?) 
```sql
create table app.food_measure_weight (
    food_id integer references(app.food.id),
    num_measures real, -- -->1<-- cup, 
    measure text, -- 1 -->cup<--, this might be another table since we'll have tons of 'cup', 'tbsp' entries here. let's wait and see
    weight_in_g real -- weight in grams
);
```
##### Recipe
```sql
create table app.recipe (
    id integer primary key generated always as identity,
    name text,
    description text,
    tags text[] -- this might be another table. we'll see how the app evolves
);
```
##### Recipe Food Item
Note: I know I will have to implement an ordering system because recipes need to list ingredients in the order they are used while cooking. It's going to be annoying to code so I'll put it off until I actually get to creating recipes
```sql
create table app.recipe_food_item (
    recipe_id integer references(app.recipe.id),
    food_id integer references(app.food.id),
    amount_in_g real, -- this I'm not 100% sure about yet. we'll probably need something a bit more sophisticated than this
    -- we can store it in grams but in the UI, show the nicer looking "1 cup" by using the food_measure_weight table
    primary key (recipe_id, food_id)
);
```
##### Recipe recipe item (it's common to refer to another recipe as an ingredient in a recipe)
Just throwing this here but I won't implement this yet for version 1

Users can repeat for now
```sql
create table app.recipe_recipe_item (
    -- TBD
);
```
##### Collection
```sql
create table app.collection (
    id integer primary key generated always as identity,
    name text,
    description text,
    tags text[] -- this might be another table. we'll see how the app evolves
);
```
##### Collection food item
```sql
create table app.collection_food_item (
    food_id integer references(app.food.id),
    collection_id integer references(app.collection.id),
    primary key (food_id, collection_id)
);
```

##### Collection recipe item
```sql
create table app.collection_recipe_item (
    recipe_id integer references(app.recipe.id),
    collection_id integer references(app.collection.id),
    primary key (recipe_id, collection_id)
);
```
##### Collection collection item
```sql
create table app.collection_collection_item (
    collection_id integer primary key references(app.collection.id),
);
```

