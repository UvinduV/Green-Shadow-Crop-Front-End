$(document).ready(function () {
    loadCrops();
});


function loadCrops() {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/crops",
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        success: function (crops) {
            console.log("Crops loaded:", crops);
            $("#crop-table").empty();

            crops.forEach(function (crop) {
                var record = `
                    <tr style="cursor: pointer">
                        <td class="crop-code-value">${crop.cropCode}</td>
                        <td class="crop-image-value">
                            <img src="data:image/png;base64,${crop.cropImage}" alt="crop Image" style="width: 100px; height: 60px; object-fit: cover;">
                        </td>
                        <td class="crop-name-value">${crop.commonName}</td>
                        <td class="crop-scientific-value">${crop.scientificName}</td>
                        <td class="crop-category-value">${crop.category}</td>
                        <td class="crop-season-value">${crop.season}</td>
                        <td class="crop-field-value">${crop.fieldId}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#crop-table").append(record);
            });
            $("#crop-table").on("click", ".update-button", function () {
                const row = $(this).closest("tr");

                const crop_code = row.find(".crop-code-value").text();
                const crop_name = row.find(".crop-name-value").text();
                const scientific_name = row.find(".crop-scientific-value").text();
                const category = row.find(".crop-category-value").text();
                const season = row.find(".crop-season-value").text();
                const field_name = row.find(".crop-field-value").text();

                $("#crop_code").val(crop_code);
                $("#crop_common_name").val(crop_name);
                $("#crop_scientific_name").val(scientific_name);
                $("#crop_category").val(category);
                $("#crop_season").val(season);
                $("#crop_field").val(field_name !== "Unassigned" ? field_name : "");
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to load vehicle:", error);
            //alert("An error occurred while loading the crop data.");
        },
    });
}

$("#crop-table").on("click", ".delete-button", function () {
    const row = $(this).closest("tr");

    const cropCode = row.find(".crop-code-value").text();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/crops/${cropCode}`,
        method: "DELETE",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        contentType: "application/json",
        success: function (results) {
            console.log(results);
            Swal.fire({
                title: "Crop Delete",
                text: "Crop Successfully Deleted",
                icon: "success"
            });
            loadCrops();
        },
        error: function (error) {
            console.log("Status:", status);
            console.log("Error:", error);
            Swal.fire({
                title: "Crop Delete",
                text: "Crop Delete Unsuccessfull",
                icon: "error"
            });
            loadCrops();
        },
    });
});


function saveCrop() {

    const fieldName= $("#field_details").val();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/fields/getFieldCode/${fieldName}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        success: function (fieldCode) {
            console.log("load field code:", fieldCode);
            const formData = new FormData();

            formData.append("commonName", $("#crop_common_name").val());
            formData.append("scientificName", $("#crop_scientific_name").val());
            formData.append("cropImage", $("#crop_image")[0].files[0]);
            formData.append("category", $("#crop_category").val());
            formData.append("season", $("#crop_season").val());
            formData.append("field",fieldCode);

            $.ajax({
                url: "http://localhost:5050/greenShadowCrop/api/v1/crops",
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
                        title: "Crop Save",
                        text: "Crop Successfully Saved",
                        icon: "success"
                    });
                    loadCrops();
                },
                error: function (result) {
                    clearFields();
                    console.log(result);
                    Swal.fire({
                        title: "Crop Save",
                        text: "Crop Save Unsuccessfull",
                        icon: "error"
                    });
                    loadCrops();
                },
            });
        },
        error: function (error) {
            alert("Error loading crop code: " + error.responseText);
            console.error(error);
        },
    });
}
function updateCrop() {

    const fieldName= $("#field_details").val();
    const cropCode= $("#crop_code").val();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/fields/getFieldCode/${fieldName}`,
        type: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
        success: function (fieldCode) {
            console.log("load field code:", fieldCode);
            const formData = new FormData();

            formData.append("commonName", $("#crop_common_name").val());
            formData.append("scientificName", $("#crop_scientific_name").val());
            formData.append("cropImage", $("#crop_image")[0].files[0]);
            formData.append("category", $("#crop_category").val());
            formData.append("season", $("#crop_season").val());
            formData.append("field",fieldCode);

            $.ajax({
                url: `http://localhost:5050/greenShadowCrop/api/v1/crops/${cropCode}`,
                method: "PUT",
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
                        title: "Crop Update",
                        text: "Crop Successfully updated",
                        icon: "success"
                    });
                    loadCrops();
                },
                error: function (result) {
                    clearFields();
                    console.log(result);
                    Swal.fire({
                        title: "Crop update",
                        text: "Crop update Unsuccessfull",
                        icon: "error"
                    });
                    loadCrops();
                },
            });
        },
        error: function (error) {
            alert("Error loading crop code: " + error.responseText);
            console.error(error);
        },
    });
}
function clearCropFields() {
    $("#crop_code").val("");
    $("#crop_common_name").val("");
    $("#crop_scientific_name").val("");
    $("#crop_image").val("");
    $("#crop_category").val("");
    $("#crop_season").val("");
}