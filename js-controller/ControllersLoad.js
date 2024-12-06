/*$(document).ready(function () {
    fetchFieldNames("field_details");
    fetchFieldNames("staff_field_details");
    fetchFieldNames("log_field_details");
    fetchStaffNames("log_staff_details");
    fetchStaffNames("vehicle_staff_details");
    fetchFieldNames("equip_field_details");
    fetchStaffNames("equip_staff_details");
    fetchCropNames("log_crop_details");
});*/

function fetchCropNames(targetElementId) {
    const token= localStorage.getItem("token")
    console.log("token crop name:"+token)
    $.ajax({
        url: " http://localhost:5050/greenShadowCrop/api/v1/crops/getAllCropNames",
        type: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
        contentType: "application/json",
        success: function (response) {
            console.log("Crop name: ", response);

            $(`#${targetElementId}`)
                .empty()
                .append($("<option>", { value: "", text: "Select Crop" }));

            response.forEach((crop) => {
                console.log(crop);
                $(`#${targetElementId}`).append(
                    $("<option>", { value: crop, text: crop })
                );
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading crop names:", status, error);
        },
    });
}

function fetchFieldNames(targetElementId) {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/fields/getAllFieldNames",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        success: function (response) {
            console.log("Field name: ", response);

            $(`#${targetElementId}`)
                .empty()
                .append($("<option>", { value: "", text: "Select Field" }));

            response.forEach((field) => {
                console.log(field);
                $(`#${targetElementId}`).append(
                    $("<option>", { value: field, text: field })
                );
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading field names:", status, error);
        },
    });
}
function fetchStaffNames(targetElementId) {
    $.ajax({
        url: " http://localhost:5050/greenShadowCrop/api/v1/staff/getAllStaffNames",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        success: function (response) {
            console.log("Staff name: ", response);

            $(`#${targetElementId}`)
                .empty()
                .append($("<option>", { value: "", text: "Select A Member" }));

            response.forEach((staff) => {
                console.log(staff);
                $(`#${targetElementId}`).append(
                    $("<option>", { value: staff, text: staff })
                );
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading staff member names:", status, error);
        },
    });
}