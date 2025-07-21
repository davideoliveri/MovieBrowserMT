# yo, man!

the requirements are in the [requirements/Req.pdf](requirements/Req.pdf) file

# yo, man!

the requirements are in the [requirements/Req.pdf](requirements/Req.pdf) file

## instructions

1. clone the repo and enter it
2. copy or rename the file `.env.example` to `.env`
3. in this new `.env` file replace `<your_tmdb_api_key>` with your actual TMDB API key (see below for instructions about how to get it)
4. run `npm install` (or your flavour of package manager)
5. run `npm run dev`
6. go to [https://localhost:5173](https://localhost:5173)

### how to get your TMBD API key

1. go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) and signup for an account, follow instructions (e.g. you may need to activate your email account by clicking on a link in an email after signup)
2. once you are in, go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). alternatively, you can get there by clicking on your avater => settings => API
3. scroll to the bottom and you will find a section called `API key` where you will see a short alphanumeric string, that's your API key.
4. copy it and paste it in the `.env` file as a string (i.e. surrounded by quotes)
