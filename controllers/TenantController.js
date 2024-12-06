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
const userId=req.session.user.id;
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
        userId,
        idProof,
        addressProof

});
await  createnewProperty.save();

res.redirect('/tenant-list');
} catch (error) {
    console.error("Database save error:", error);
      res.status(500).send({
        success: false,
        message: "An error occurred while saving property details.",
        error: error.message
      });
}
}

const tenantList=async(req,res)=>{
    // console.log(req.session.user.id);
    // return;
    let tenanatList;

    if(req.session && req.session.user && req.session.user.roles==='user')
    {
        tenanatList=await TenantModel.find({userId:req.session.user.id});

    }
    else
    {
        tenanatList=await TenantModel.find({});


    }
    res.render('templates/users/tenantlist', {tenanatList});

}

const editTenantController_old=async(req,res)=>{
    const tenantlists=await TenantModel.findById(req.params.id);
    // console.log(tenantlists);return;
const date= new Date(tenantlists.dateOfBirth);
    // console.log(dateOfBirth);return;
    tenantlists.dateOfBirth = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
    console.log(tenantlists);return;

    res.render('templates/users/edittenantdetails',{tenantlists});

}
const editTenantController = async (req, res) => {
    try {
      // Fetch tenant details by ID
      const tenantlists = await TenantModel.findById(req.params.id);
  
      // If tenant is not found, return a 404 error
      if (!tenantlists) {
        return res.status(404).send({
          success: false,
          message: 'Tenant not found',
        });
      }

      
    var formated_dateOfBirth = convert(tenantlists.dateOfBirth);
    var formated_preferredLeaseStartDate = convert(tenantlists.preferredLeaseStartDate);

      // Render the edit tenant details page with formatted data
    //   res.render('templates/users/edittenantdetails', { tenantlists,formated_dateOfBirth });
      res.render('templates/users/edittenantdetails', {
        tenantlists,
        formated_dateOfBirth,
        formated_preferredLeaseStartDate,
        pid:req.params.id
      });
    } catch (error) {
      // Handle any errors that occur
      console.error('Error fetching tenant details:', error);
      res.status(500).send({
        success: false,
        message: 'An error occurred while fetching tenant details',
        error: error.message,
      });
    }
  };
//   const convert = (str) => {
//     var date = new Date(str),
//       mnth = ("0" + (date.getMonth() + 1)).slice(-2),
//       day = ("0" + date.getDate()).slice(-2);
//     return [date.getFullYear(), mnth, day].join("-");
//   };
  const convert = (date) => {

var formattedDate = new Date(date)
  .toISOString() // Convert to ISO format
  .replace(/T/, ' ') // Replace "T" with a space
  .replace(/\..+/, ''); // Remove milliseconds and timezone
  var auxCopia = formattedDate.split(" ");
  date = auxCopia[0]; // Extract date
var hour = auxCopia[1];
return date;
  };


  
  const updatetenantDetails_01 = async (req, res) => {
    try {
      // Extract tenant ID from the request body
      const { pid, ...updateData } = req.body; // `pid` is the tenant's ID
      console.log("PID received:", pid);
  
      // Check if `pid` is provided
      if (!pid) {
        return res.status(400).send({
          success: false,
          message: "Tenant ID is required for updating details.",
        });
      }
  
      // Process uploaded files
      const processedFiles = {
        idProof: req.files.idProof
          ? req.files.idProof.map(file => file.path.replace('public/', ''))
          : [],
        addressProof: req.files.addressProof
          ? req.files.addressProof.map(file => file.path.replace('public/', ''))
          : [],
      };
  
      const { idProof, addressProof } = processedFiles;
  
      // Prepare the update payload
      const updatePayload = {
        ...updateData, // Add all non-file fields from the body
      };
  
      // If files are provided, include them in the update
      if (idProof.length > 0) updatePayload.idProof = idProof;
      if (addressProof.length > 0) updatePayload.addressProof = addressProof;
  
      // Process nested fields (if provided)
      if (updateData.contactDetails) {
        updatePayload.contactDetails = {
          phone: updateData.contactDetails.phone,
          email: updateData.contactDetails.email,
        };
      }
  
      if (updateData.currentAddress) {
        updatePayload.currentAddress = {
          street: updateData.currentAddress.street,
          city: updateData.currentAddress.city,
          state: updateData.currentAddress.state,
          zipCode: updateData.currentAddress.zipCode,
          country: updateData.currentAddress.country,
        };
      }
  
      if (updateData.emergencyContact) {
        updatePayload.emergencyContact = {
          name: updateData.emergencyContact.name,
          relationship: updateData.emergencyContact.relationship,
          phone: updateData.emergencyContact.phone,
        };
      }
  
      // Update the tenant details in the database
      const updatedTenant = await TenantModel.findByIdAndUpdate(
        pid,
        updatePayload,
        { new: true } // Return the updated document
      );
  
      if (!updatedTenant) {
        return res.status(404).send({
          success: false,
          message: "Tenant not found or update failed.",
        });
      }
  
      // Redirect to the tenant list page
      res.redirect('/tenant-list');
    } catch (error) {
      console.error("Error updating tenant details:", error);
      res.status(500).send({
        success: false,
        message: "An error occurred while updating tenant details.",
        error: error.message,
      });
    }
  };
  const updatetenantDetails = async (req, res) => {
    try {
      const { pid, ...updateData } = req.body;
    //   console.log(updateData);
    //   return;
      if (!pid) {
        return res.status(400).send({
          success: false,
          message: "Tenant ID is required for updating details.",
        });
      }

      // Process file uploads
      const processedFiles = {
        idProof: req.files?.idProof
          ? req.files.idProof.map((file) => file.path.replace("public/", ""))
          : [],
        addressProof: req.files?.addressProof
          ? req.files.addressProof.map((file) => file.path.replace("public/", ""))
          : [],
      };
  
      // Include file paths if new files are uploaded
      if (processedFiles.idProof.length) updateData.idProof = processedFiles.idProof;
      if (processedFiles.addressProof.length)
        updateData.addressProof = processedFiles.addressProof;
  
      // Update tenant in the database
      const updatedTenant = await TenantModel.findByIdAndUpdate(
        pid,
        { $set: updateData },
        { new: true }
      );
  
      if (!updatedTenant) {
        return res.status(404).send({
          success: false,
          message: "Tenant not found",
        });
      }
  
      res.redirect("/tenant-list");
    } catch (error) {
      console.error("Error updating tenant details:", error);
      res.status(500).send({
        success: false,
        message: "An error occurred while updating tenant details.",
      });
    }
  };
  
module.exports={addTenantDetails,saveTenantDetails,tenantList,editTenantController,updatetenantDetails};