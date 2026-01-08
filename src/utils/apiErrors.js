class apiError extends Error
{
    constructor(
        statuscode,
        message= "Something went wrong",
        errors= [],
        statck="" 
    )
    {
        super(message)
        this.statuscode= statuscode
        this.error= errors
        this.message=message
        this.stack=stack
        this.data=null
        this.success=false
    
    }
     
}
export {apiError}