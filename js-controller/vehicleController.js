$(document).ready(function () {
    loadVehicle();
});

function loadVehicle() {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/vehicle",
        type: "GET",
        contentType: "application/json",
        success: function (vehicle) {
            console.log("Vehicle loaded:", vehicle);
            $("#vehicle-table").empty();

            vehicle.forEach(function (vehicle) {
                var record = `
                    <tr style="cursor: pointer">
                        <td class="vehicle-license-value">${vehicle.licensePlateNumber}</td>
                        <td class="vehicle-category-value">${vehicle.vehicleCategory}</td>
                        <td class="vehicle-fuel-value">${vehicle.fuelType}</td>
                        <td class="vehicle-status-value">${vehicle.status}</td>
                        <td class="vehicle-remarks-value">${vehicle.remarks}</td>
                        <td class="vehicle-staff-value">${vehicle.assignedStaff.firstName}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#vehicle-table").append(record);
            });

            $("#vehicle-table").on("click", ".update-button", function () {
                const row = $(this).closest("tr");

                const license_plate_number = row.find(".vehicle-license-value").text();
                const category = row.find(".vehicle-category-value").text();
                const fuel = row.find(".vehicle-fuel-value").text();
                const status = row.find(".vehicle-status-value").text();
                const remarks = row.find(".vehicle-remarks-value").text();
                const staff = row.find(".vehicle-staff-value").text();

                $("#license_plate").val(license_plate_number);
                $("#category").val(category);
                $("#fuel_type").val(fuel);
                $("#status").val(status);
                $("#vehicle_staff_details").val(staff);
                $("#remarks").val(remarks);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to load vehicle:", error);
            alert("An error occurred while loading the vehicle data.");
        },
    });
}

function saveVehicle() {
    var license_number = $("#license_plate").val();
    var vehicle_category = $("#category").val();
    var fuel_type = $("#fuel_type").val();
    var status = $("#status").val();
    var remarks = $("#remarks").val();

    const assigned_staff = $("#vehicle_staff_details").val();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/staff/getStaffId/${assigned_staff}`,
        type: "GET",
        success: function (staffId) {
            console.log("load Staff Id:", staffId);
            $.ajax({
                url: "http://localhost:5050/greenShadowCrop/api/v1/vehicle",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    licensePlateNumber: license_number,
                    vehicleCategory: vehicle_category,
                    fuelType: fuel_type,
                    status: status,
                    remarks: remarks,
                    assignedStaff: {
                        staffId: staffId
                    }
                }),
                success: function (result) {
                    clearVehicleForm();
                    loadVehicle();
                    console.log(result);
                    Swal.fire({
                        title: "Vehicle Save",
                        text: "Vehicle Successfully Saved",
                        icon: "success"
                    });
                },
                error: function (result) {
                    clearVehicleForm();
                    Swal.fire({
                        title: "Vehicle Save",
                        text: "Vehicle Save Unsuccessfull",
                        icon: "error"
                    });
                    console.log(result);
                },
            });

        },
        error: function (error) {
            alert("Error loading staff id: " + error.responseText);
            console.error(error);
        },
    });
}
function updateVehicle() {
    var vehicle_category = $("#category").val();
    var fuel_type = $("#fuel_type").val();
    var status = $("#status").val();
    var remarks = $("#remarks").val();

    const license_number = $("#license_plate").val();

    const assigned_staff = $("#vehicle_staff_details").val();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/staff/getStaffId/${assigned_staff}`,
        type: "GET",
        success: function (staffId) {
            console.log("load Staff Id:", staffId);
            const updatedVehicleData = {
                vehicleCategory: vehicle_category,
                fuelType: fuel_type,
                status: status,
                remarks: remarks,
                assignedStaff:{
                    staffId: staffId
                }
            };

            $.ajax({
                url: `http://localhost:5050/greenShadowCrop/api/v1/vehicle//${license_number}`,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(updatedVehicleData),
                success: function () {
                    clearVehicleForm();
                    Swal.fire({
                        title: "Vehicle Update",
                        text: "Vehicle Successfully Updated",
                        icon: "success"
                    });
                    loadVehicle();
                },
                error: function (error) {
                    clearVehicleForm();
                    loadVehicle();
                    Swal.fire({
                        title: "Vehicle Update",
                        text: "Vehicle Update Unsuccessfull",
                        icon: "error"
                    });
                    console.error(error.responseText);
                },
            });

        },
        error: function (error) {
            alert("Error loading staff id: " + error.responseText);
            console.error(error);
        },
    });
}


function clearVehicleForm() {
    $("#license_plate").val("");
    $("#category").val("");
    $("#fuel_type").val("");
    $("#status").val("");
    $("#vehicle_staff_details").val("");
    $("#remarks").val("");
}