# Intro

This project is a `PWA` built using `create-react-app`.

## File Structure

It follows the typical `create-react-app` file structure with a small **twist**.

1. 1st-Order Components are at `./client/src/components`
2. 2nd-Order Components are at `./client/src/pages`

> 2nd Order Components are Components Composed of 1st-Order Components

### 1st Order Components

1.  **Toggle**:
    Switches Theme Between `Tron (dark)` and `Flynn (light)`.

    States: NULL

    Props:

        Theme State (From App): Dark/Light

    If Theme is Dark, CSS Varibles are Set to Shades of Black.

    If Theme is Light, CSS Varibles are Set to Shades of White.

2.  **NavBar**:
    Houses Toggle, Sliding Menu & LoGo.

    States:

        Open: To Control Sliding Menu Location (OutSide ViewPort (or) InSide ViewPort)

    Props:

        1. Logo: A SVG Containing Logo
        2. Theme State(from App): Dark/Light

3.  **Menu**:
    Menu Bar with Sliding Animations.

    States: NULL

    Props:

        1. Top: Object Of Icons To Be Displayed on Top Section of Menu
        2. Bottom: Object Of Icons To Be Displayed on Bottom Section of Menu
        3. Ref: A Ref Hook onto Menu

4.  **ExtendDrop**:
    Click to Drop/Extend Contents.
