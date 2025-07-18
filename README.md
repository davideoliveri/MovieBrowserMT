# yo, man!
the requirements are in the [requirements/Req.pdf](requirements/Req.pdf) file

## instructions 
1. clone the repo and enter it
0. copy or rename the file `.env.example` to `.env`
0. in this new `.env` file replace `<your_tmdb_api_key>` with your actual TMDB API key (see below for instructions about hoe to get it)
0. run `npm install` (or your flavour of package manager)
0. run `npm run dev` 
0. go to [https://localhost:5173](https://localhost:5173)


### how to get your TMBD API key
1. go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup) and signup for an account, follow instructions (e.g. you may need to activate your email account by clicking on a link in an email after signup)
0. once you are in, go to [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). alternatively, you can get there by clicking on your avater => settings => API 
0. scroll to the bottom and you will find a section called `API key` where you will see a short alphanumeric string, that's your API key. 
0. copy it and paste it in the `.env` file as a string (i.e. surrounded by quotes)