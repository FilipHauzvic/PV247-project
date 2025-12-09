# 🎞️ Movie Emoji Guesser

[App Available Here](https://pv-247-project-eight.vercel.app/)

A web application where users guess movie names based on a sequence of emojis. Authenticated user can create custom quizzes with movie questions and custom emoji strings. The movie titles themselves are fetched from an external movie API.

## Project Scope

The goal of this project is to build a full‑stack application where users can:

* Play quizzes.
* Sign in using GitHub.
* Create multiple quizzes with movie guesses.
* Select emojis representing each movie.
* View quiz history and statistics.

## Features

### Authentication

* GitHub OAuth

### Quiz Creation

* Create and manage quizzes
* Add movies guesses to a quiz
* Assign emojis to each movie guess
* Delete only quizzes owned by the signed-in user

### Gameplay

* Guess the movie name based on displayed emojis
* Starting with 1 revealed emoji, more are revealed after wrong guess
* Interactive quiz UI
* Final summary page

### Movies & Emojis

* Movie list fetched dynamically from an external API
* Emojis chosen manually by quiz creators
* All emoji‑movie pairs stored in the database per quiz

## Requirements Summary

* Any user can play any quiz and view immediate results
* User must be authenticated to create quizzes
* User must be authenticated to view their game history and statistics
* Each quiz is owned by a single creator
* Only owners can delete their quizzes
* Each quiz contains:
  * Multiple movies
  * A unique emoji string for each movie

## Contributors

* Martin Štalmach
* Tomáš Božek
* Filip Haužvic
* Jan Kubala
