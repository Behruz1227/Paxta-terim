export const base_url: string = "http://137.184.31.19:8080/"
export const log_in: string = `${base_url}auth/login`

// user all  admin
export const allUserGet: string = `${base_url}user/list`
export const userGetMe: string = `${base_url}user/getMe`
export const updateMe: string = `${base_url}user/edit/`


export const timeGetUrl: string = `${base_url}user/interval-hour`
export const timePutUrl: string = `${base_url}user/editTime`

// post user admin
export const postUsers: string = `${base_url}user/create`

// delete user 
export const deleteUser:string = `${base_url}user`


// Tuman qo'shish admin uchun 
export const districtAdd = `${base_url}district/create`

// Tumanlarni ko'radi admin 
export const getDistirct = `${base_url}district/list`

// Tumanlarni delete qilish
export const editDistrict = `${base_url}district`
export const deleteDist = `${base_url}district`


// Machine 
export const getMachine:string = `${base_url}machines/list`
export const postMachine:string = `${base_url}machines/create`
export const delMachine:string = `${base_url}machines/delete/`
export const putMachine:string = `${base_url}machines/edit-machine/`

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


// Notifications urls
export const notificationRead:string = `${base_url}notification/read`
export const notificationConfirmed:string = `${base_url}notification/confirmation`
export const notificationGetUser:string = `${base_url}notification/page/user`
export const notificationGetAdmin:string = `${base_url}notification/page/admin`
export const notificationCountUser:string = `${base_url}notification/count/master`
export const notificationCountAdmin:string = `${base_url}notification/count/admin`
export const notificationDelete:string = `${base_url}notification/delete`


// Statistika admin 
export const statistic = `${base_url}statistic/report`

// Report 
export const reportAdmin = `${base_url}report/admin`

// Farm Edit 
export const ReportEdit = `${base_url}report/edit/`

// Dowloand excel 
export const ExcelDowloand = `${base_url}attachment/download`
