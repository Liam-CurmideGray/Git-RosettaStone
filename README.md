# Displaying data from API with Node JS

## **Getting data from the API then displaying them on the terminal**
## Description

For the task, **Axios** needs to be installed in the directory of the source files. This is so the HTTP calls can be made to the API. When the project is started with `npm start`, data will be displayed from the following API :- **swapi**.

**Postman** can also be utilised to simulate and make calls to the API that is currently being used. This helps to validate multiple things that you may be looking for, in order for your main program to successfully utilise the API.

### Setup Axios / Inquirer

For the task, **Axios** and the **Inquirer** needs to be installed in the directory of the source files. Axios is utilised so that HTTP calls can be made to the API. Inquirer is utilised for the displaying of data in a list and the ability of the user to select from the list. The project was required to be executed with `starwars` rather than `npm start`. This was done by adding a `bin:{"starwars": pathOfIndex.js}` to the **package.json** file. Also a link is required to be made with the use of `npm link` to make all of this possible.

### Task

User will be greeted by a list featuring all of the spaceships that exist in the Starwars API :- **swapi**. After one is chosen, the pilots of the ship will be displayed. If none are found, a message will appear displaying as such. If the pilot exists and one is chosen, the details of the pilot will then be displayed to the user.

## Table

| Task Name        | Task Desc                  | Output                                                |     |     |
| ---------------- | -------------------------- | ----------------------------------------------------- | --- | --- |
| `starwars`       | Program will execute       | List of Spaceships will be displayed                  |     |     |
| Spaceship chosen | User will pick a spaceship | List of Pilots of the chosen spaceship (if available) |     |     |
| Pilot chosen     | User will pick a pilot     | Properties of the chosen pilot will be displayed      |     |     |

---------------------------------------------------------------------------------------------------------------------------------------------------

## **Converting to Type Script**

### Setup Typescript

For the task, **typescript** was installed by using `npm install -g typescript` in order for the conversion to be possible. Additional modules were required such as the clock which can be installed using `npm install tsc-watch`. The following file **tsconfig.json** needs to be created in order for typescript to work.

### Task

To compile the program for the first time (without the watch), the following command `npm run compile` must be utilised. Multiple typescript files were created and the functions were moved to their respective file. This was done with the use of `export` and `import`. This greatly improves readability and maintainability of the code. Interfaces and the declaration of data types of variables, were implemented to satisfy typescript formats.

## Table

| Task Name                   | Task Desc                  | Output                                                |
| --------------------------- | -------------------------- | ----------------------------------------------------- |
| `npm install -g typescript` | Typescript will install    |                                                       |
| `npm install tsc-watch`     | Watch will install         |                                                       |
| `npm run compile`           | Program will compile       | `tsc -p tsconfig.json`                                |
| `npm run watch`             | Program will run watch     | Automatically update the js file when saving ts files |
| `starwars`                  | Program will execute       | List of Spaceships will be displayed                  |
| Spaceship chosen            | User will pick a spaceship | List of Pilots of the chosen spaceship (if available) |
| Pilot chosen                | User will pick a pilot     | Properties of the chosen pilot will be displayed      |

---------------------------------------------------------------------------------------------------------------------------------------------------

## **Polishing it up**

### Task

The program adds some fancy banners using `figlet` creating a title screen which displays `Starwars`. Some fancy colours to a bit bit of flavour to the titlescreen using `chalk`. A loading animation displaying whilst the data is loading using `clui` and finally for the user to be given the option to clear the terminal once the application is complete using `clear`.

## Table

| Task Name            | Task Desc            | Output                                                  |
| -------------------- | -------------------- | ------------------------------------------------------- |
| `npm install figlet` | Figlet will install  | Dependency feature to execute `figlet` function         |
| `npm install chalk`  | Chalk will install   | Dependency feature to execute `chalk` function          |
| `npm install clui`   | Clui will install    | Dependency feature to execute `clui` function           |
| `npm install clear`  | Clear will install   | Dependency feature to execute `clear` function          |
| `starwars`           | Program will execute | Executing the application for the user to interact with |
