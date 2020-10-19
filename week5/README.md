# FAQ

As noted on the homepage for this code samples repo:

- For `census-geojson`, you will need a Python 3 venv with `geopandas`
- For the others, you need a Python 3 venv with `flask`, and set up yarn in each `web/static` with `yarn install`
- For `postcodes-demo`, you will need a folder called `postcodes-geojson` where you place the files generated from `census-geo-json`.


&mdash;


Students have sent in some questions which I answer below:

**1. You have a folder called `web/static`. Did you create this folder manually? Or was it automatically generated when you run flask or something like the .venv folder that was automatically created when we create a new virtual environment?**

I created this folder manually, and refer to it inside `app.py`. It does not necessarily need to be named like this (apart from for convention): for the purposes of what we are doing here, it’s fine either way as long as `app.py` matches up.

**2. I am still having difficulties in accessing your UNSW Map website. It's coming up as blank for me. Do you know how to fix it? Is it because I have not downloaded jQuery, bootstrap, etc?**

Yes, it is likely that you need to run `yarn install` inside the `app/static` folder. Please use your terminal to navigate to the `app/static` folder and then run `yarn install`.

**3. In using the libraries from bootstrap, jquery, etc, do I need to install them like we have to install flask and pandas before I can write the dependencies in package.json file? Also, when installing them (if required), do we still have to do it inside the virtual environment?**

Yes, you need to install them as per point 2 – but it does not matter in this case whether or not you are in the appropriate Python `venv` (JavaScript is separate to Python).

**4. I tried to install `yarn` in Ubuntu on WSL, but it told me that some of the packages were not found.**

If this happens even after you go through the instructions at https://classic.yarnpkg.com/en/docs/install/#debian-stable then please run the following:

```bash
sudo apt-get update && sudo apt-get upgrade
sudo apt-get install yarn --fix-missing
```

**5. I am recreating my own variation of this repository to enhance my learning. How can I create a `yarn.lock` file?**

```bash
yarn init
yarn add leaflet --save
yarn add bootstrap --save
yarn add jquery --save
yarn add select2 --save
yarn add @ttskch/select2-bootstrap4-theme --save
```

**6. The map isn't working, and I am seeing a lot of error 404 in my Flask log.**

Error 404 means that the expected files did not exist. This is usually a case of a missing `yarn install`.


&mdash;

Thank you to Rafella Angeline and Hillary Mulyadi for volunteering their time to provide feedback on this document. Your efforts to help your peers are highly valued.