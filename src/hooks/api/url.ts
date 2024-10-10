export const base_url: string = "http://137.184.31.19:8080/"
export const log_in: string = `${base_url}auth/login`

// user all  admin
export const allUserGet: string = `${base_url}user/list`
export const userGetMe: string = `${base_url}user/getMe`
export const updateMe: string = `${base_url}user/edit`

// post user admin
export const postUsers: string = `${base_url}user/create`

// delete user 
export const deleteUser:string = `${base_url}user`


// Tuman qo'shish admin uchun 
export const districtAdd = `${base_url}district/create`

// Tumanlarni ko'radi admin 
export const getDistirct = `${base_url}district/list`

//Tumanlarni delete qilish
export const editDistrict = `${base_url}district`
export const deleteDist = `${base_url}district`


// Machine 
export const getMachine:string = `${base_url}machines/list`
export const postMachine:string = `${base_url}machines/create`
export const delMachine:string = `${base_url}user`
export const putMachine:string = `${base_url}user`

// farms
export const farms_get:string = `${base_url}farm/list`
export const farms_global:string = `${base_url}farm/`

// master uchun hisobot get yo'li 
export const report_get: string = `${base_url}report/master`
export const report_time: string = `${base_url}report/times`

// cottom piket
export const cottom_get:string = `${base_url}cottonPicked/list`
export const farmList:string = `${base_url}farm/list`
export const reposrtAdd:string = `${base_url}report/create`