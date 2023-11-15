# 🕗 Fast Track Timecards: A Timecard App 🕔

## Description

Fast Task Timecards is your go-to for hassle-free time tracking, making work hours management a breeze. Ideal for any company that wants to log hours effortlessly from wherever, it's the ultimate tool for payroll folks.

## Table of centents

[Installation](https://github.com/The-hyphen-user/timecard#Installation)  
[Tech Stack](https://github.com/The-hyphen-user/timecard#Tech-Stack)  
[How its made](https://github.com/The-hyphen-user/timecard#How-its-made)  
[Technologies](https://github.com/The-hyphen-user/timecard#Technologies)  
[Lessons Learned](https://github.com/The-hyphen-user/timecard#Lessons-Learned)  
[Minor improvements ](https://github.com/The-hyphen-user/timecard#Minor-things-that-could-be-improved)  
[Major improvements](https://github.com/The-hyphen-user/timecard#Major-things-that-could-be-improved)

## Installation

Clone to local machine

```bash
git clone https://github.com/The-hyphen-user/timecard.git
```

Install node dependencies for the client

```bash
cd client
npm install
```

Install node dependencies for the server

```bash
cd backend
npm install
```

Create a .env file using the example.env file as a template in the root directory

```console
MONGODB_CONNECTION_URL = ''
SESSION_SECRET_KEY = ''
```

Start the front end

```bash
cd client
npm run start
```

start the backend

```bash
cd backend
npm run start
```

## Tech Stack

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![ESLint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Axios](https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white)
![mongodb](https://img.shields.io/badge/mongodb-3FA037?&style=for-the-badge&logo=mongodb&logoColor=white)
![redux](https://img.shields.io/badge/redux-764ABC?&style=for-the-badge&logo=redux&logoColor=white)
![docker](https://img.shields.io/badge/docker-1D91B4?&style=for-the-badge&logo=docker&logoColor=white)
![passport](https://img.shields.io/badge/passport-00B9F1?&style=for-the-badge&logo=passport&logoColor=white)
![nginx](https://img.shields.io/badge/nginx-009900?&style=for-the-badge&logo=nginx&logoColor=white)

## How its made 🔨

The express server uses a remote mongoDB database to hold users admins timecards jobsites and information needed for account creation and account recovery. The express server checks for auth, creates updates and deletes request data as needed.
The react frontend displays, creates, and searches for jobsites, timecards. The redux statemanagment keeps track of different sets of jobsites and timecards for easyer understanding and look ups.

## New Technologies 💻

I delved into the world of code quality by integrating ESLint into my workflow. Utilize ESLint strengthened my understanding of coding standards and provided a powerful mechanism for identifying and rectifying potential issues early in the development process.

## Lessons Learned 💡

I acquired valuable insights into optimizing the structure of my Redux code. The challenge of efficiently loading and updating many sets of data of the same type prompted me to rethink and refine my approach to state management.

## Minor things that could be improved 🔸

Photos could be included for each jobsite, either routed through the server and held on an image hosting or images could be stored on the server host (require server memory to be dynamic resizing)

## Major things that could be improved 🔶

The back end could be transformed into a set of serverless functions for more module deployment. The front end could transformed into a server side rendering app to allow better web crawlers/SEO
