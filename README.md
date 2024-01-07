a table to display recently popular repos
![image](https://github.com/yanggggjie/rising-repo/blob/main/example/example.png)

roadmap

- v0.11 use virtual table

  - The table with 1000 rows will be very slow. Use virtual lists to improve performance 🚧

    

- v0.10 add language json cache ✅

  - Because the repo rank list api does not contain language information. A language-specific rank list cannot be generated ✅
  - 💡Query the repo rank list for language information and cache it. Rank lists for specific languages can be generated ✅
  - use redis for cache, Now you can see the top 1000 at once without the annoying load more  🤯🤯🤯

  

- v0.9 Optimize performance ✅
  - Shorten the first screen loading time
    - move vercel deploy region to HongKong ✅
    - add pagination to reduce home page data requests ✅
  - Shorten the time of switching date button and add loader
    - add loader ✅
  - vercel Real Experience Score increased from 53 to 79 🚀
