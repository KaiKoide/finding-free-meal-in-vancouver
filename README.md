# Free Meal Location Search Web Application

This application is a web app designed to search for locations offering free and low-cost meals. Built with Next.js, users can save favorite locations, check details, and get routes from their current location to their selected location.

## Key Features

- **Location Search**: Calls location information for free meal spots from an API.
- **Favorite Functionality**: Users can favorite locations and save them to the database.
- **Details View**: Clicking on a location shows detailed information about the spot.
- **Route Display**: Shows the route from the user's current location to a specified location.
- **OAuth Authentication**: Secure user login using OAuth to protect user information.

## Technologies Used

- Next.js
- API integration
- OAuth authentication
- Database (for saving favorite locations)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/KaiKoide/meal-search-app.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables (for OAuth and API keys).

    Create a `.env.local` file in the root directory of your project and add the following environment variables:

    ```bash
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
    AUTH_SECRET=your_auth_secret # Added by `npx auth`. Read more: https://cli.authjs.dev

    AUTH_GITHUB_ID=your_github_id
    AUTH_GITHUB_SECRET=your_github_secret

    AUTH_GOOGLE_ID=your_google_id
    AUTH_GOOGLE_SECRET=your_google_secret
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Users can log in and search for free meal locations near their current location.
2. Save favorite spots, which will be stored in the database.
3. Clicking on a location will display its details.
4. View routes from the user's current location to the selected location.
