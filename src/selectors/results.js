const getAllResults = (results) => {
    let organized = [];
    results.map((result) => {
        organized[result.id] = {
            ...result
        };
    });
    return organized;
}

export { getAllResults as default};