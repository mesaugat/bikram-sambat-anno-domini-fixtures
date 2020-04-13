# bikram-sambat-anno-domini-fixtures

**Fixtures for B.S. to A.D. date conversion.**

> *Export of [Bikram Sambat](https://en.wikipedia.org/wiki/Vikram_Samvat) and corresponding [Anno Domini](https://en.wikipedia.org/wiki/Anno_Domini) dates have been extracted from [nepcal.com](http://nepcal.com). Full attribution goes to author(s) of [nepcal.com](http://nepcal.com).*

## Sample

```json
[
  {
    "npYear": 2077,
    "npMonth": 1,
    "npDay": 1,
    "enYear": 2020,
    "enMonth": 4,
    "enDay": 13
  },
  {
    "npYear": 2077,
    "npMonth": 1,
    "npDay": 2,
    "enYear": 2020,
    "enMonth": 4,
    "enDay": 14
  },
  ...
]
```

## Run the Scraper

```sh
$ git clone https://github.com/mesaugat/bikram-sambat-anno-domini-fixtures.git

$ yarn
$ yarn start
```

## Download

Download [export.json](export.json) or [export-minified.json](export-minified.json) for the full conversion data set from 1975 B.S. to 2100 B.S.

## Contributing

If you find that the scraper is not working or the exported data has issues, please feel free to file an issue or send in a pull request.

## License

The underlying source code used to scrape the content is licensed under the [MIT](LICENSE) license.
