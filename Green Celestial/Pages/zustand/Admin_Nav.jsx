import { create } from "zustand";


const adminUiContext = create((state) => ({
    page : {
        active : 0,
        menu : "0%"
    },

    setPage : (val) => state((temp) => ({
        page : { ...temp.page, active : val }
    })),

    setMenu : (val) => state((temp) => ({
        page : { ...temp.page, menu : val }
    }))

}))

export default adminUiContext
