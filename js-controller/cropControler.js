$(document).ready(function () {
    loadCrops();
});


function loadCrops() {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/crops",
        type: "GET",
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
            alert("An error occurred while loading the crop data.");
        },
    });
}