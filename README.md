(WIP: the docs are terrible, and this still needs some work to be useful to others)

#JUST SIMPLE BOILERPLATE FOR REACT FLUX AND FOUNDATION (USING ES6)
---
### Why?

 Created this example, just because I ended up using it a couple of times for my own projects. To me it seems a simple way of using Foundation (6) with React and Flux. I tried to use as much ES6 as possible.
 There are a lot of things missing that I mention in the end of the README.md

### Init

```
npm install  
bower install
gulp build (which has watchify on js files, no watch on scss)
```
serve the `index.html` file

##### How to start
Check the test files added to the project.

* Create stores in `src/stores`
* Create actions in `src/actions`
* Add constants to `src/constants.js`
* Add React components to `src/components`
* Add styles to `scss/main.scss`

### How it works

There is a `scss` directory with the sass files and a `src` directory.

The `src` directory contains all the javascript and react.
Gulp generates a `bin` directory with all the bundles built in.

This examples allows you to create multiple js bundles by creating different entry point files in the `src/apps` directory (this entrypoints need to have the name format `app[app name].js`).
The `constants.js` and `dispatcher.js` are unique files that represent the flux dispatcher and the constants used. The `constants.js` should be updated with the constants needed in the stores and actions.

 The actions and stores directories allow you to have multiple stores/actions available.
 
  `src/stores/testStore.js` is an example of a store. it extends from the `BaseStore` which has the common code between stores. The store should be an unique object, since it is supposed to have a state and should be shared by all the objects that want to use it.
  The __emitChange() function is optional since it needs to be called only when the state of the store changes.
  
  `src/actions/testAction.js` is an example of an actions class. This class only contains static methods and doesn't require to be instantiated into an object since it has no state. Each method just calls the dispatcher with an object that is composed of type and data properties. This properties will be passed to the store by the action.
  
  `src/components/test/Test.jsx` is a test React file, that contains two classes, `TestItem` (extends from `BaseComponent`), `Test` (extends from `BaseComponentController`). Classes that extend the `BaseComponent` class get the helper methods to create Foundation rows, columns, tables, etc. `BaseComponentController` extended classes extend the `BaseComponent` class and also are rerendered when a change is emitted by the corresponding store.

### What is missing

# Testing is missing!
I have to learn how to test frontends, any interesting articles or changes are welcome.

* Better docs
* More abstraction
* Testing
* Routing
* Make it agnostic to Foundation, Bootstrap, etc