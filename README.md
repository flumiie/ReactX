# ReactX

ReactX is a React Native app for SpaceX infos and live observations on the go
Such observation examples are countdown rocket launches, cores, capsules, pads, and more
Data will be fetched from the SpaceX's own REST API wrapped in GraphQL located in ```./graphql```

## Pre-installation

To begin, clone this repo and navigate to the project's root.<br/>
Then run this command:<br/>
```yarn preinstall```

## App Build, Metro Bundler, & GQL Server

To build the app:<br/>
Android: ```yarn build```
iOS: ```yarn buildios```

To start the Metro Bundler: ```yarn metro```

To start GraphQL server: ```yarn gql```

## Sidenote

This project is using ```yarn``` node package manager.
Using ```npm``` is not prohibited, but it is recommended to not mixmatch it.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.<br/>
Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
