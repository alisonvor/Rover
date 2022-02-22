# Rover

Rover is a application that takes a input file with the upper right coordenites of a Plateau and a Rover position
and instructions so it can return the final position of the Rover inside the Plateau, its possible to have multiple
Rovers on the same Plateau

## How to use

The first step is to provide the application with the necessary information to run, that being, the upper right coordinates of a Plateau, next you will need to provid at least one position and instructions to a rover, as the example follows:  
5 5  
1 2 N  
LMLMLMLMM  
The file is under src/input directory

## Installation

This application was developted and tested on Ubuntu 20.04.3 with node 16.13.2

to install:

```bash
yarn
```

to run:

```bash
yarn dev
```

to test:

```bash
yarn test
```
