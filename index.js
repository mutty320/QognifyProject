
    document.addEventListener('DOMContentLoaded', async () => {



        


        var devices = await navigator.hid.getDevices();
        // if(!devices) {
            let requestButton = document.getElementById("hid-device");
            requestButton.innerHTML = "click here to add a new device";
            requestButton.addEventListener("click", async () => {

            devices = await navigator.hid.requestDevice({filters: []});
            // await devices[0].open().then(()=>{console.log("opend")})


                // .catch(()=>{console.log("failed opening/connecting")});

            });
        // }
        devices.forEach(device => {
            console.log(`HID: ${device.vendorId} ${device.productName} ${device.productId} ${device.opened}`);
        });
        // navigator.hid.addEventListener()  ${device.collections}

        // navigator.hid.addEventListener('connect', ({device}) => {
        //     console.log(`HID connected: ${device.productName}`);
        // });


        // device.addEventListener('inputreport',event => {
        //     console.log("inputreport: "+ event.reportId);
        // });
        // devices.forEach(device => {

            let device = devices[0];
            await device.open().then(()=>{console.log("opened")})
        console.log("vid:" + device.vendorId + device.opened);

        device.addEventListener("inputreport", event => {
            console.log("inside listener")
                const { data, device, reportId } = event;

                // if (device.productId != "9032") return;

                const value = data.getUint8(0);
                if (value == 0) return;


                console.log(`Data: ${value}.`);
            });
        // });



        // if(!devices || devices.length == 0) {


            // {vendorId:  14648, productId: 4145}


            // for (let collection of device.collections) {
            //     // A HID collection includes usage, usage page, reports, and subcollections.
            //     console.log(`Usage: ${collection.usage}`);
            //     console.log(`Usage page: ${collection.usagePage}`);
            //
            //     for (let inputReport of collection.inputReports) {
            //         console.log(`Input report: ${inputReport.reportId}`);
            //         // Loop through inputReport.items
            //     }
            //
            //     for (let outputReport of collection.outputReports) {
            //         console.log(`Output report: ${outputReport.reportId}`);
            //         // Loop through outputReport.items
            //     }
            //
            //     for (let featureReport of collection.featureReports) {
            //         console.log(`Feature report: ${featureReport.reportId}`);
            //         // Loop through featureReport.items
            //     }
            //
            //     // Loop through subcollections with collection.children
            // }
            // if (!device) {
            //     console.log("No device was selected.");
            // } else {
            //     await device[0].open();
            //     console.log(`HID: ${device[0].vendorId}`);
            //     console.log("HID:", device.vendorId);
            // }

        });
;


/*
code from stackoverflow

let device;

  if (!("hid" in navigator)) {
    console.log("WebHID is not available yet.");
  }

  navigator.hid.getDevices().then(devices => {
    if (devices.length == 0) {
      console.log(`No HID devices selected. Press the "request device" button.`);
      return;
    }
    device = devices[0];
    console.log(`User previously selected "${device.productName}" HID device.`);
    console.log(`Now press "open device" button to receive input reports.`);
  });

  requestDeviceButton.onclick = async event => {
    document.body.style.display = "none";
    try {
        const filters = [
            {
                vendorId: "8792",
                productId: "9032"
            }
        ];

      [device] = await navigator.hid.requestDevice({ filters });
      if (!device) return;

      console.log(`User selected "${device.productName}" HID device.`);
      console.log(`Now press "open device" button to receive input reports.`);
    } finally {
      document.body.style.display = "";
    }
  };

  openButton.onclick = async event => {
    if (!device) return;

    await device.open();
    console.log(`Waiting for user to press button...`);

    device.addEventListener("inputreport", event => {
      const { data, device, reportId } = event;

      if (device.productId != "9032") return;

      const value = data.getUint8(0);
      if (value == 0) return;


      console.log(`Data: ${value}.`);
    });
  };*/