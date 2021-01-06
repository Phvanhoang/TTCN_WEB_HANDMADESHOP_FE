function chechURLService(path) {
    const paths=["/order","/profile","./purchase"]
    const rolePath = paths.filter((item)=>{
        return item === path
    })
    console.log(rolePath.length)
  return rolePath.length===0?false:true
}
export {chechURLService}