### a table to display recently popular repos

![image](https://github.com/yanggggjie/rising-repo/blob/main/example/example.png)

### roadmap

- **v2.0**
  - From SPA to page: More intuitive and stable. 🚀

- v1.1
  - refactor UI  ✅
  - improve  performance 🚧
  - improve data source stability 🚧🚧

- **v1.0**
  - move to SSG, use next static export and github actions build for every day 🚀✅
  - add build your own guide ✅


- v0.15
  - refactor server actions ✅
  - add lastUpdateTime ✅


- v0.14.1
  - add tag filter ✅


- v0.14 add topics
  - For a period of time, we may focus on a specific topic, such as tailwindcss, state management or form. It is necessary to add topics for filtering ✅



- v0.13   big query ✅

  - Migrate to google big query  ✅
  - Update data at shorter intervals 🗓️
  - More data is available, adding more key information 🗓️



- v0.12 optimize

  - Switching filters is slow  ✅
  - Add animation, scrolling, hovering and more 🚧



- v0.12 add create time column and filter

  - Most of the repos in this rank are very old and they are already well known. Therefore, it is necessary to add the create time column to discover the rising new stars ✅

  - Add age column can filter by  year month and day 🎂



- v0.11.1 optimize ✅

  - add a better-looking loader ✅
  - when language filter change scroll to top ✅
  - open links  in a new tab ✅



- v0.11 use virtual table ⌛️

  - The table with 1000 rows will be very slow. Use virtual lists to improve performance ⌛️(Is it really necessary?)



- v0.10 add language json cache ✅

  - Because the repo rank list api does not contain language information. A language-specific rank list cannot be generated ✅
  - 💡Query the repo rank list for language information and cache it. Rank lists for specific languages can be generated ✅
  - use redis for cache, Now you can see the top 1000 at once without the annoying load more  🤯



- v0.9 Optimize performance ✅
  - Shorten the first screen loading time
    - move vercel deploy region to HongKong ✅
    - add pagination to reduce home page data requests ✅
  - Shorten the time of switching date button and add loader
    - add loader ✅
  - vercel Real Experience Score increased from 53 to 79 🚀


### build your own local
Add a local .env file

for GOOGLE_SERVICE_KEY
steps:
- goto google cloud
- add a new project
- in the project
  - goto **IAM Admin**
  - create a new **service account** (make sure it is **owner**, in the second step)
  - at the service account line, click **action** goto **manage keys**
    - add new key
    - download the json file
    - copy all of the json content and encode to base64
    - copy all of the base64 content to env file
    - GOOGLE_SERVICE_KEY="the base64 content"


1. need a secret key file of Google Cloud's service account

2. the service account is the owner of the project

3. convert the file to base64 and copy to GOOGLE_SERVICE_KEY="the base64 content"



for MY_GITHUB_TOKEN

goto https://github.com/settings/tokens -> classic -> Generate new token

the .env file

![image](https://github.com/yanggggjie/rising-repo/blob/main/example/env-setting.png)

pnpm install

pnpm run dev

http://localhost:3000/rising-repo

### deploy your own

Enable GitHub Pages

![image](https://github.com/yanggggjie/rising-repo/blob/main/example/pages-setting.png)


Add Secret

![image](https://github.com/yanggggjie/rising-repo/blob/main/example/secret-setting.png)

To deploy

![image](https://github.com/yanggggjie/rising-repo/blob/main/example/to-deploy.png)

Deploy result

![image](https://github.com/yanggggjie/rising-repo/blob/main/example/deploy-result.png)
