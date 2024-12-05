$(document).ready(function () {
    loadEquipment();
});

var recordIndex;

function loadEquipment() {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/equipment",
        type: "GET",
        contentType: "application/json",
        success: function (equipment) {
            console.log("Equipment loaded:", equipment);
            $("#equipment-table").empty();

            equipment.forEach(function (equipment) {
                var record = `
                    <tr>
                        <td class="equip-id-value">${equipment.equipmentId}</td>
                        <td class="equip-name-value">${equipment.name}</td>
                        <td class="equip-type-value">${equipment.type}</td>
                        <td class="equip-status-value">${equipment.status}</td>
                        <td class="equip-staff-value">${equipment.assignedStaff.firstName}</td>
                        <td class="equip-field-value">${equipment.assignedField.fieldName}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#equipment-table").append(record);
            });
            $("#equipment-table").on("click", ".update-button", function () {
                const row = $(this).closest("tr");

                const equip_id = row.find(".equip-id-value").text();
                const equip_name = row.find(".equip-name-value").text();
                const equip_type = row.find(".equip-type-value").text();
                const equip_status = row.find(".equip-status-value").text();
                const equip_assigned_staff = row.find(".equip-staff-value").text();
                const equip_assigned_field = row.find(".equip-field-value").text();

                $("#equip_id").val(equip_id);
                $("#equipment_name").val(equip_name);
                $("#equipment_type").val(equip_type);
                $("#equipment_status").val(equip_status);
                $("#equip_staff_details").val(equip_assigned_staff);
                $("#equip_field_details").val(equip_assigned_field);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to load equipment:", error);
            alert("An error occurred while loading the equipment data.");
        },
    });
}