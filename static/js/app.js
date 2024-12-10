function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let samples = data.samples;
    let resultArray = samples.filter((sampleDictionary) => sampleDictionary.id == sample);
    let result = resultArray[0];

    let otuIDs = result.otu_ids;
    let otuLabels = result.otu_labels;
    let sampleValues = result.sample_values;

    let bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      margin: { t: 30 },
      hovermode: "closest",
      xaxis: { title: "OTU ID" }
    };

    let bubbleData = [
      {
        x: otuIDs,
        y: sampleValues,
        text: otuLabels,
        mode: "markers",
        marker: {
          size: sampleValues,
          color: otuIDs,
          colorscale: "Earth"
        }
      }
    ];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    let yticks = otuIDs.slice(0, 10).reverse();

    let barData = [
      {
        y: yticks.map(id => `OTU ${id}`),
        x: sampleValues.slice(0, 10).reverse(),
        text: otuLabels.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h"
      }
    ];

    let barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 }
    };

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function buildMetaData(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let metadata = data.metadata;

    let resultArray = metadata.filter(sampleDictionary => sampleDictionary.id == sample);
    let result = resultArray[0];

    let PANEL = d3.select("#select-metadata");

    PANEL.html("");

    for (let key in result) {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
    }
  });
}

function init() {
  let selector = d3.select("#selDataset");

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    let sampleNames = data.names;

    for (let i = 0; i < sampleNames.length; i++) {
      selector.append("option").text(sampleNames[i]).property("value", sampleNames[i]);
    }

    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetaData(firstSample);
  });
}

init();

