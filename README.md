# Venues

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.0-rc.0.

## Getting started

**NB!** This test assignment is provided without api keys. When providing your keys, please generate once off keys and delete them immediately after use as this repository is not audited for any security vulnerabilities. This warning is out of abundance of caution as I have not added any outright suspicious packages, but we are dealing with npm here.

Also, as I had to timebox this test assignment fairly aggressively then I did not get to adding tests. If this is a hard requirement and rest of it looks fine then please reach out and I can add them.

1. run `npm install`
2. generate new environment files with `ng generate environments`
3. follow the structure of `environments.example.ts` file to provide Foursquare api key in `environment.development.ts` file
4. add your google maps api key to index.html file (look for `key` property in script). This is technically an optional step because you should still be able to use a heavily watermarked map
5. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`

## General notes

- currently the application shows maximum of 50 burger joints within 1,001 to 5,5km from Tartu Bus station
- as I had to timebox this test assignment fairly aggressively then I did not get to adding tests or making the experience accessible for users with disabilities. If any of those is a hard requirement and rest of it looks fine then please reach out and I can add those.
- structure of the application is meant to support addition of other venue types at a later date, this is why burger-joints is built as a separate feature
- I added Powered by Foursquare tothe footer due to their terms of service
- the default image is of a burger, but is intentionally not highlighted
- Although Foursquare API sorts photos array by latest I still decided to err on the side of caution and double check this is code to guard against any regression
