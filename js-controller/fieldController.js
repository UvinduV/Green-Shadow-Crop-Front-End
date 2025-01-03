$(document).ready(function () {
    loadFields();
});

function loadFields() {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/fields",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        success: function (fields) {
            console.log("Fields loaded:", fields);
            $("#fields-table").empty();

            fields.forEach(function (field) {
                const locationString = `(${field.location.x}, ${field.location.y})`;
                var record = `
                    <tr style="cursor:pointer">
                        <td class="field-code-value">${field.fieldCode}</td>
                        <td class="field-image1-value">
                            <img src="data:image/png;base64,${field.fieldImage1}" alt="Field Image 1" style="width: 100px; height: 60px; object-fit: cover;">
                        </td>
                        <td class="field-name-value">${field.fieldName}</td>
                        <td class="field-location-value">${locationString}</td>
                        <td class="extent-size-value">${field.extentSize}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#fields-table").append(record);
            });
            $("#fields-table").on("click", ".update-button", function () {
                const row = $(this).closest("tr");

                const field_code = row.find(".field-code-value").text();
                const field_name = row.find(".field-name-value").text();
                const field_location = row.find(".field-location-value").text();
                const extent_size = row.find(".extent-size-value").text();
                const [x, y] = field_location
                    .replace("(", "")
                    .replace(")", "")
                    .split(",")
                    .map((coord) => coord.trim());

                $("#field_code").val(field_code);
                $("#field_name").val(field_name);
                $("#field_location_x").val(x);
                $("#field_location_y").val(y);
                $("#field_size").val(extent_size);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to load fields:", error);
            //alert("An error loading the field data.");
        },
    });
}
function saveField() {
    var fieldName = $("#field_name").val();
    var location_x = $("#field_location_x").val();
    var location_y = $("#field_location_y").val();
    var extentSize = $("#field_size").val();

    const url = `http://localhost:5050/greenShadowCrop/api/v1/fields`;
    $.ajax({
        url: url,
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        data: JSON.stringify({
            fieldName: fieldName,
            x: location_x,
            y: location_y,
            extentSize: extentSize,
            crops: [],
            staff: []
        }),
        success: function (response) {
            clearFields();
            console.log(response);
            Swal.fire({
                title: "Field Save",
                text: "field save successfully",
                icon: "success"
            });
            loadFields();
        },
        error: function (response) {
            clearFields();
            console.log(response);
            Swal.fire({
                title: "Field Save",
                text: "field save Unsuccessfully",
                icon: "error"
            });
            loadFields();
        },
    });
}
function updateFields() {
    var fieldName = $("#field_name").val();
    var location_x = $("#field_location_x").val();
    var location_y = $("#field_location_y").val();
    var extentSize = $("#field_size").val();


    const fieldCode = $("#field_code").val();
    const url = `http://localhost:5050/greenShadowCrop/api/v1/fields/${fieldCode}`;
    $.ajax({
        url: url,
        method: "PUT",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        data: JSON.stringify({
            fieldName: fieldName,
            x: location_x,
            y: location_y,
            extentSize: extentSize,
            crops: [],
            staff: []
        }),
        success: function (response) {
            clearFields();
            console.log(response);
            Swal.fire({
                title: "Field Update",
                text: "field Update successfully",
                icon: "success"
            });
            fetchFieldNames("field_details");
            loadFields();
        },
        error: function (response) {
            clearFields();
            console.log(response);
            Swal.fire({
                title: "Field Update",
                text: "field Update Unsuccessfully",
                icon: "error"
            });
            loadFields();
        },
    });
}
function uploadImage() {
    const formData = new FormData();

    formData.append("fieldCode", $("#field_code").val());

    formData.append("fieldImage1", $("#field_image1")[0].files[0]);
    formData.append("fieldImage2", $("#field_image2")[0].files[0]);

    const fieldCode = $("#field_code").val();
    const url = `http://localhost:5050/greenShadowCrop/api/v1/fields/${fieldCode}`;
    $.ajax({
        url: url,
        method: "POST",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: false,
        processData: false,
        data: formData,
        success: function (result) {
            clearFields();
            console.log(result);
            Swal.fire({
                title: "Image Upload",
                text: "Image Upload successfully",
                icon: "success"
            });
            loadFields();
        },
        error: function (result) {
            clearFields();
            console.log(result);
            Swal.fire({
                title: "Image Upload",
                text: "Image Upload Unsuccessfully",
                icon: "error"
            });
            loadFields();
        },
    });
}
$("#fields-table").on("click", ".delete-button", function () {
    const row = $(this).closest("tr");

    const fieldCode = row.find(".field-code-value").text();

    const url = `http://localhost:5050/greenShadowCrop/api/v1/fields/${fieldCode}`;
    $.ajax({
        url: url,
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        success: function (results) {
            console.log(results);
            Swal.fire({
                title: "Field Delete",
                text: "field Delete successfully",
                icon: "success"
            });
            fetchFieldNames("field_details");
            loadFields();
        },
        error: function (error) {
            console.log("Status:", status);
            console.log("Error:", error);
            Swal.fire({
                title: "Field Delete",
                text: "field Delete Unsuccessfully",
                icon: "error"
            });
        },
    });
});

function clearFields() {
    console.log("clear field in fields");
    $("#field_code").val("");
    $("#field_name").val("");
    $("#field_location_x").val("");
    $("#field_location_y").val("");
    $("#field_size").val("");
    $("#field_image1").val(null);
    $("#field_image2").val(null);
}