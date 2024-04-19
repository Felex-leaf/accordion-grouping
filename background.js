// 展开的分组
let updatingId;

chrome.tabGroups.onUpdated.addListener(async (info) => {
    if (!info.collapsed && updatingId !== info.id) {
        updatingId = info.id;
        const res = await chrome.tabGroups.query({})
        await Promise.all(res.map(async ({ id }) => {
            if (id === updatingId) return;
            console.log(id);
            await chrome.tabGroups.update(id, {
                collapsed: true, 
            })
        }))
        updatingId = undefined;
    }
})