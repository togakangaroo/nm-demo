export const DateDisplay = ({value}) => !value ? null : (
    new Date(value).toLocaleDateString()
)
