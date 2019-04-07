const firstVisual = "intro"; 
const firstPatient = "0"

function buildIntro() {
  console.log("Intro build complete.")
  // Use d3 to select the visualization div
  var visualDiv = d3.select("#visualizations");

  // Use `.html("") to clear any existing metadata
  visualDiv.html("");

  d3.select("#visualizations")
      .append("div")
      .attr("id", "intro")
    d3.select("#intro")
      .append("h1")
      .attr("class", "display-4")
      .text("An introductory page")
    d3.select("#intro")
      .append("h1")
      .attr("class", "display-4")
      .text("for our project goes here.")
}

function buildRawData() {
    console.log("Raw data table build complete.")
    d3.select("#visualizations")
      .append("div")
      .attr("id", "table")
    d3.select("#table")
      .append("h1")
      .attr("class", "display-4")
      .text("If we had gotten to it,")
    d3.select("#table")
      .append("h1")
      .attr("class", "display-4")
      .text("a table would have gone here.")
    d3.select("#table")
      .append("h1")
      .attr("class", "display-4")
      .text("Raw data in console log for now.")
    d3.json(`/raw-data`, function(rawData) {
      console.log(rawData);
    });
}
  
function buildPatientData(patientKey) {
  d3.select("#visualizations")
    .html("")
    .append("div")
    .attr("id", "patient-data")
    .attr("class", "container")
  d3.select("#patient-data")
    .append("select")
    .attr("id", "select-patient")
    .attr("onchange", "patientChanged(this.value)")
  
  // row 1
  d3.select("#patient-data")
    .html("")
    .append("div")
    .attr("id", "patient-data-row-1")
    .attr("class", "row")
  d3.select("#patient-data-row-1")
    .append("div")
    .attr("id", "age-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("Age")
  d3.select("#patient-data-row-1")
    .append("div")
    .attr("id", "intercourse-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("Age Sexually Active")
  d3.select("#patient-data-row-1")
    .append("div")
    .attr("id", "sex-partners-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("# of Sexual Partners")
  d3.select("#patient-data-row-1")
    .append("div")
    .attr("id", "pregnancies-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("# of Pregnancies")

  // row 2
  d3.select("#patient-data")
    .append("div")
    .attr("id", "patient-data-row-2")
    .attr("class", "row")
  d3.select("#patient-data-row-2")
    .append("div")
    .attr("id", "smokes-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("Smokes")
  d3.select("#patient-data-row-2")
    .append("div")
    .attr("id", "hbc-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("Birth Control")
  d3.select("#patient-data-row-2")
    .append("div")
    .attr("id", "iud-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("IUD")
  d3.select("#patient-data-row-2")
    .append("div")
    .attr("id", "std-col")
    .attr("class", "card col-md-3")
    .append("div")
    .attr("class", "card-header")
    .append("h5").text("STDs")

  // enter data into row 1
  d3.select("#meta-card")
    .append("div")
    .attr("class", "card-header")
    .append("h4").text(`Patient ${patientKey}`)
  d3.select("#meta-card")
    .append("div")
    .attr("class", "card-body")
  d3.json(`/patient-data`, function(patientData) {
    console.log(patientData);
    console.log(Object.keys(patientData));
    Object.keys(patientData).forEach(function(patientKey) {
    d3.select("#select-patient")
      .append("option")
      .attr("value", `${patientKey}`)
      .text(`Patient ${patientKey}`)
    });

    keys = Object.keys(patientData[patientKey])
    entries = Object.entries(patientData[patientKey])
    console.log(Object.entries(patientData[patientKey]))
    console.log(keys[0])
    console.log(entries[0][1]);

    // age
    d3.select("#age-col")
      .append("h4")
      .attr("class", "display-2")
      .text(`${entries[0][1]}`)
    // age at first intercourse
    d3.select("#intercourse-col")
      .append("h4")
      .attr("class", "display-2")
      .text(`${entries[7][1]}`)
    // number of sexual partners
    d3.select("#sex-partners-col")
      .append("h4")
      .attr("class", "display-2")
      .text(`${entries[14][1]}`)
    // number of pregnancies
    d3.select("#pregnancies-col")
      .append("h4")
      .attr("class", "display-2")
      .text(`${entries[13][1]}`)
    
    // enter data into row 2
    // smokes?
    if (entries[33][1] == 1) {
      d3.select("#smokes-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/green-check.png")
    }
    else {
      d3.select("#smokes-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/red-x.png")
    }

    // hormonal birth control?
    if (entries[9][1] || entries[11][1] == 1) {
      d3.select("#hbc-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/green-check.png")
    }
    else {
      d3.select("#hbc-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/red-x.png")
    }

    // iud?
    if (entries[11][1] == 1) {
      d3.select("#iud-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/green-check.png")
    }
    else {
      d3.select("#iud-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/red-x.png")
    }

    // stds?
    if (entries[15][1] || entries[15][1] == 1) {
      d3.select("#hbc-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/green-check.png")
    }
    else {
      d3.select("#std-col")
        .append("img")
        .attr("class", "img-fluid")  
        .attr("src", "../static/images/red-x.png")
    }

    // dx?
    // if (entries[15][1] == 1) {
    //   d3.select("#dx-col")
    //     .append("img")
    //     .attr("class", "img-fluid")  
    //     .attr("src", "../static/images/green-check.png")
    // }
    // else {
    //   d3.select("#std-col")
    //     .append("img")
    //     .attr("class", "img-fluid")  
    //     .attr("src", "../static/images/red-x.png")
    // }
    
  });

  console.log("Patient data build complete.")
}
  
function buildVisualizations() {
  console.log("Visualizations build complete.")
  // append a container for our visuals to the content section of the index page
  d3.select("#visualizations")
    .append("div")
    .attr("id", "visuals")
    .attr("class", "container")
  //append 1st row to our visuals container
  d3.select("#visuals")   
    .append("div")
    .attr("class", "row justify-content-around")
    .attr("id", "visuals-row-1")
  // append a col-md-3 to our 1st row
  d3.select("#visuals-row-1")
    .append("div")
    .attr("id", "pie")
    .attr("class", "col-md-3")
    .html(`<h1 class="display-4">PIE CHART GOES HERE</h1>`)
  // append a col-md-8 for histograms to our 1st row
  d3.select("#visuals-row-1")
    .append("div")
    .attr("id", "histograms")
    .attr("class", "col-md-8")
  // append age histogram
  d3.select("#histograms")
    .append("div")
    .attr("id", "age-histo-row")
    .attr("class", "row")
  d3.select("#age-histo-row")
    .append("img")
    .attr("src", "../static/images/age-histogram.png")
    .attr("class", "img-fluid")
  d3.select("#age-histo-row")
    .append("h6")
    .attr("class", "display-5")
    .text("Patient Age Distribution")
  // append sexual partners histogram
  d3.select("#histograms")
    .append("div")
    .attr("id", "sexual-partners-histo-row")
    .attr("class", "row")
  d3.select("#sexual-partners-histo-row")
    .append("img")
    .attr("src", "../static/images/sexual-partners-histo.png")
    .attr("class", "img-fluid")
  d3.select("#sexual-partners-histo-row")
    .append("h6")
    .attr("class", "display-5")
    .text("Number of Sexual Partners")
  // append age at first intercourse histogram
  d3.select("#histograms")
    .append("div")
    .attr("id", "intercourse-age-histo-row")
    .attr("class", "row")
  d3.select("#intercourse-age-histo-row")
    .append("img")
    .attr("src", "../static/images/age-first-intercourse-histo.png")
    .attr("class", "img-fluid")
  d3.select("#intercourse-age-histo-row")
    .append("h6")
    .attr("class", "display-5")
    .text("Age Became Sexually Active")
  // append number of pregnancies histogram
  d3.select("#histograms")
    .append("div")
    .attr("id", "number-of-pregnancies-histo-row")
    .attr("class", "row")
  d3.select("#number-of-pregnancies-histo-row")
    .append("img")
    .attr("src", "../static/images/number-of-pregnancies-histo.png")
    .attr("class", "img-fluid")
  d3.select("#number-of-pregnancies-histo-row")
    .append("h6")
    .attr("class", "display-5")
    .text("Age Became Sexually Active")
  // append 2nd row to our visuals container
  d3.select("#visuals")   
    .append("div")
    .attr("class", "row")
    .attr("id", "visuals-row-2")
  // append a col-md-12 to span the entire 2nd row
  d3.select("#visuals-row-2")
    .append("div")
    .attr("id", "bubble")
    .attr("class", "col-md-12")
    .html(`<h1 class="display-4">BUBBLE CHART GOES HERE</h1>`)
}

function buildModelDev() {
  console.log("Model development build complete.")
  // Use d3 to select the visualization div
  var visualDiv = d3.select("#visualizations");

  // Use `.html("") to clear any existing metadata
  visualDiv.html("");

  d3.select("#visualizations")
    .append("div")
    .attr("id", "modelDev")
    .attr("class", "container")
  d3.select("#modelDev")   
    .append("div")
    .attr("class", "row justify-content-around")
    .attr("id", "modelDev-row-1")
  d3.select("#modelDev-row-1")
    .append("div")
    .attr("id", "pie")
    .attr("class", "col-md-4")
    .html(`<h3>A description of the junk to the right goes here!</h3>`)
  d3.select("#modelDev-row-1")
    .append("div")
    .attr("id", "bar")
    .attr("class", "col-md-7 justify-content-around")
    .html(``)
  d3.select("#bar")
    .append("div")
    .attr("id", "heat-map-row-1")
    .attr("class", "row")
  d3.select("#heat-map-row-1")  
    .append("img")
    .attr("src", "../static/images/heatmap1.png")
    .attr("id", "heat-map-image-1")
    .attr("class", "img-fluid")
  d3.select("#bar")
    .append("div")
    .attr("id", "heat-map-row-2")
    .attr("class", "row")  
  d3.select("#heat-map-row-2")  
    .append("img")
    .attr("src", "../static/images/heatmap2.png")
    .attr("id", "heat-map-image-2")
    .attr("class", "img-fluid")
  d3.select("#modelDev")   
    .append("div")
    .attr("class", "row")
    .attr("id", "modelDev-row-2")
  d3.select("#modelDev-row-2")
    .append("div")
    .attr("id", "bubble")
    .attr("class", "col-md-12")
    .html(`<h1 class="display-4">BUBBLE CHART GOES HERE</h1>`)
}

function buildExploreModel() {
  console.log("Explore model build complete.")
  // Use d3 to select the visualization div
  var visualDiv = d3.select("#visualizations");

  // Use `.html("") to clear any existing metadata
  visualDiv.html("");

  d3.select("#visualizations")
    .append("div")
    .attr("id", "intro")
  d3.select("#intro")
    .append("h1")
    .attr("class", "display-4")
    .text("Enter your own data for")
  d3.select("#intro")
    .append("h1")
    .attr("class", "display-4")
    .text("processing by our model goes here.")
}

function buildVisual(visual) {
  console.log(`Building ${visual}...`);

  // Use d3 to select the visualization div
  var visualDiv = d3.select("#visualizations");

  // Use `.html("") to clear any existing metadata
  visualDiv.html("");

  // Call the javascript function which builds the specific visualization
  if (visual == "intro") {
    buildIntro();
  }
  
  if (visual == "rawData") {
    buildRawData();
  }
  
  if (visual == "patientData") {
    buildPatientData(firstPatient)
  }

  if (visual == "visualizations") {
    buildVisualizations()
  }
  if (visual == "modelDevelopment") {
    buildModelDev()
  }
  if (visual == "exploreModel") {
    buildExploreModel()
  }
}

function init() {
  console.log("Initializing...");
  buildVisual(firstVisual);
}

function optionChanged(visual) {
  // Fetch new data each time a new sample is selected
  console.log(`Button clicked: ${visual}`);
  buildVisual(visual);
}

function patientChanged(newPatientKey) {
  // Fetch new data each time a new sample is selected
  console.log(`Patient changed: ${newPatientKey}`);
  buildPatientData(newPatientKey);
}

// Initialize the dashboard
init();
