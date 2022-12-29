export const formatDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
    return formattedDate;
}

export const formatCommentDate = (date: string) => {
    const formattedDate = new Date(date).toLocaleDateString('en-US',{
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    })
    return formattedDate;
}