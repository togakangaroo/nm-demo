export const When = ({value, render}) => {
    if(value)
        return render(value)
    return "Please wait..."
}