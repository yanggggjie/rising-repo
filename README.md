### a table to display recently popular repos

![image](https://github.com/yanggggjie/rising-repo/blob/main/example/example.png)

### roadmap
- **v0.2**
  - move to SSG, use next static export and github actions build for every day 🚧


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
