export const formatDate = (recievedDate) => {

    const dateString = recievedDate.split('T')[0]

    const start = new Date(dateString);
    const endDate = new Date(start);

    endDate.setDate(start.getDate() + 7);

    console.log(endDate);

    const options = { month: 'long', day: 'numeric' }

    const formatStartDate = start.toLocaleDateString("en-us", options)
    const formatendedDate = endDate.toLocaleDateString("en-us", options)

    console.log(formatendedDate)

    return `${formatStartDate} - ${formatendedDate}`

}