const Customer = require("../models/Customer");
const mongoose = require("mongoose");


/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {

  //const messages= await req.consumerFlash('info');
  const messages = req.flash('info');
  const locals = {
    title: 'NodeJS',
    description: 'Free NodeJs User Management System'
  }

  let perPage=12;
  let page=req.query.page || 1;
  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
    // const count = await Customer.count();
    const count = await Customer.countDocuments({});

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
    

  } catch (error) {
    console.log(error);

  }





}

/**
 * GET /
 * New Customer Form
 */

/*const addCustomers = async () => {
  try {
    await Customer.insertMany([
      {
        firstName: "Raddy",
        lastName: "NodeJs",
        tel: "1-353-218-4881",
        email: "raddy@outlook.couk",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Aphrodite",
        lastName: "Parker",
        tel: "1-857-407-8574",
        email: "quam@protonmail.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Camden",
        lastName: "Perce",
        tel: "(251) 719-5886",
        email: "aliquam.tincidunt.nunc@icloud.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Emi",
        lastName: "Hutchinson",
        tel: "1-878-674-6876",
        email: "aenean.egestas@aol.org",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Chaim",
        lastName: "Holland",
        tel: "1-776-825-8236",
        email: "a@google.couk",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Harding",
        lastName: "Cameron",
        tel: "1-935-750-3637",
        email: "non.nisi@outlook.edu",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Dane",
        lastName: "Kelley",
        tel: "(129) 964-3195",
        email: "morbi@aol.org",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Emery",
        lastName: "Thornton",
        tel: "(565) 248-4784",
        email: "egestas.blandit.nam@icloud.org",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Tarik",
        lastName: "Francis",
        tel: "1-679-436-4746",
        email: "lacus@outlook.ca",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
            {
        firstName: "Rebecca",
        lastName: "Booth",
        tel: "1-548-944-3232",
        email: "sapien@icloud.couk",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Solomon",
        lastName: "Larson",
        tel: "(648) 588-4779",
        email: "accumsan.interdum@icloud.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Tanner",
        lastName: "Morin",
        tel: "(189) 577-5612",
        email: "nec.diam.duis@google.couk",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "September",
        lastName: "Walton",
        tel: "1-732-422-2492",
        email: "sed.sapien.nunc@icloud.com",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Kermit",
        lastName: "Becker",
        tel: "1-163-757-8638",
        email: "id@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Anish",
        lastName: "Brown",
        tel: "1-163-757-8638",
        email: "Anish@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Duncan",
        lastName: "Woodard",
        tel: "1-163-757-8638",
        email: "Duncan@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Izabella",
        lastName: "Stark",
        tel: "1-163-757-8638",
        email: "Izabella@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Dhruv",
        lastName: "Fields",
        tel: "1-163-757-8638",
        email: "Dhruv@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Harriet",
        lastName: "Gillespie",
        tel: "1-163-757-8638",
        email: "Harriet@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Chad",
        lastName: "Barton",
        tel: "1-163-757-8638",
        email: "Chad@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
      {
        firstName: "Esmee",
        lastName: "Trujillo",
        tel: "1-163-757-8638",
        email: "Esmee@yahoo.net",
        details: "Demo details text.",
        createdAt: Date.now(),
        updatedAt: Date.now()
      },
    ]);
    console.log('Customers added!');
  } catch (error) {
    console.error('Error inserting customers:', error);
  }
};

addCustomers();*/



exports.addCustomer = async (req, res) => {

  const locals = {
    title: 'Add New Customer -NodeJs',
    description: 'Free NodeJs User Management System'
  };
  res.render('customer/add', locals);

};


/**
 * POST /
 * Create New Customer 
 */
exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  })

  try {
    await Customer.create(newCustomer);
    await req.flash('info', 'New Customer has been added.')
    res.redirect('/');

  } catch (err) {
    console.log(error);

  }


  /*const locals={
    title:'New Customer Added!',
    description:'Free NodeJs User Management System'
  }*/
  //res.render('customer/add',locals);


}

/**
 * GET/
 * Customer Data
 */
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "View Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET/
 * Edit Customer Data
 */
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Customer Data",
      description: "Free NodeJs User Management System",
    };

    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Customer Data
 */
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Customer Data
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Customer Data
 */
exports.searchCustomers = async (req, res) => {
  const locals = {
    title: "Search Customer Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
