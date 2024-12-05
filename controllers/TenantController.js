const TenantModel =require("../models/TenantModel");

const addTenantDetails=(req,res)=>{

    res.render('templates/users/tenantdetails', { title: 'Tenant Details' });

}
const saveTenantDetails=async(req,res)=>{
    // console.log(req.files.addressProof[0].path);
    const processedFiles = {
        idProof: req.files.idProof
          ? req.files.idProof.map(file => file.path.replace('public/', ''))
          : [],
        addressProof: req.files.addressProof
          ? req.files.addressProof.map(file =>file.path.replace('public/', ''))
          : [],
        //   idProof: req.files.idProof
        //   ? req.files.idProof.map(file =>({ originalName:file.originalname,path:    file.path}))
        //   : [],
      };

    const { idProof, addressProof } = processedFiles;

    // console.log(req.files.idProof.map(file=>file.path.replace('public/','')));
    // console.log(idProof+addressProof);

    // return;
try {
  
    const {fullName,dateOfBirth,gender,contactDetails,currentAddress,preferredLeaseStartDate,leaseDuration,budget,emergencyContact}=req.body;
    // console.log(emergencyContact);
    // return;
    if(!fullName || !dateOfBirth || !gender || !contactDetails || !currentAddress || !preferredLeaseStartDate || !leaseDuration || !leaseDuration || !budget || !emergencyContact)
{
    return res.status(400).send({ 
        success: false, 
        message: "All required fields must be filled." 
      });
}
createnewProperty=new TenantModel({
    fullName,
    dateOfBirth,
    gender,
    contactDetails:{
        phone:contactDetails.phone,
    email:contactDetails.email},
    currentAddress:{
        street:currentAddress.street,
        city:currentAddress.city,
        state:currentAddress.state,
        zipCode:currentAddress.country,
        country:currentAddress.country},
        preferredLeaseStartDate,
        leaseDuration,
        budget,
        emergencyContact:{
            name:emergencyContact.name,
            relationship:emergencyContact.relationship,
            phone:emergencyContact.phone
        },
        emergencyContact,
        idProof,
        addressProof

});
await  createnewProperty.save();

} catch (error) {
    console.error("Database save error:", error);
      res.status(500).send({
        success: false,
        message: "An error occurred while saving property details.",
        error: error.message
      });
}
}
module.exports={addTenantDetails,saveTenantDetails,};