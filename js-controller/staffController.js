$(document).ready(function () {
    loadStaff();
});

function loadStaff() {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/staff",
        type: "GET",
        contentType: "application/json",
        success: function (staff) {
            console.log("Staff loaded:", staff);
            $("#staff-table").empty();

            staff.forEach(function (staff) {
                const fullName = staff.firstName + " " + staff.lastName;
                const address = staff.addressLine1+","+staff.addressLine2+","+staff.addressLine3+","+staff.addressLine4+","+staff.addressLine5;

                var record = `
                    <tr style="cursor: pointer">
                        <td class="staff-id-value">${staff.staffId}</td>
                        <td class="staff-name-value">${fullName}</td>
                        <td class="staff-designation-value">${staff.designation}</td>
                        <td class="staff-gender-value">${staff.gender}</td>
                        <td class="staff-joinedDate-value">${staff.joinedDate}</td>
                        <td class="staff-dob-value">${staff.dob}</td>
                        <td class="staff-address-value">${address}</td>
                        <td class="staff-contact-value">${staff.contactNo}</td>
                        <td class="staff-email-value">${staff.email}</td>
                        <td class="staff-role-value">${staff.role}</td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#staff-table").append(record);
            });

            $("#staff-table").on("click", ".update-button", function () {
                const row = $(this).closest("tr");

                const staff_id = row.find(".staff-id-value").text();
                const fullName = row.find(".staff-name-value").text();
                const nameParts = fullName.split(" ");
                const firstName = nameParts[0];
                const lastName = nameParts.slice(1).join(" ");
                const staffDesignation = row.find(".staff-designation-value").text();
                const staffGender = row.find(".staff-gender-value").text();
                const staffJoinedDate = row.find(".staff-joinedDate-value").text();
                const staffDob = row.find(".staff-dob-value").text();

                const staffAddress = row.find(".staff-address-value").text();
                const addressParts = staffAddress.split(",");
                const address1 = addressParts[0];
                const address2 = addressParts[1];
                const address3 = addressParts[2];
                const address4 = addressParts[3];
                const address5 = addressParts[4];

                const staffContact = row.find(".staff-contact-value").text();
                const staffEmail = row.find(".staff-email-value").text();
                const staffRole = row.find(".staff-role-value").text();

                $("#staff_id").val(staff_id);
                $("#first_name").val(firstName);
                $("#last_name").val(lastName);
                $("#designation").val(staffDesignation);
                $("#gender").val(staffGender);
                $("#joinedDate").val(staffJoinedDate);
                $("#dob").val(staffDob);

                $("#addressLine1").val(address1);
                $("#addressLine2").val(address2);
                $("#addressLine3").val(address3);
                $("#addressLine4").val(address4);
                $("#addressLine5").val(address5);

                $("#contact").val(staffContact);
                $("#email").val(staffEmail);
                $("#role").val(staffRole);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to load staff:", error);
            alert("An error loading the staff data.");
        },
    });
}

$("#staff-table").on("click", ".delete-button", function () {
    const row = $(this).closest("tr");

    const staffId = row.find(".staff-id-value").text();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/staff/${staffId}`,
        method: "DELETE",
        contentType: "application/json",
        success: function (results) {
            fetchStaffNames("vehicle_staff_details")
            console.log(results);
            Swal.fire({
                title: "Staff Member Delete",
                text: "Staff Member Successfully Deleted",
                icon: "success"
            });
            loadStaff();
        },
        error: function (error) {
            console.log("Status:", status);
            console.log("Error:", error);
            Swal.fire({
                title: "Staff Member Delete",
                text: "Staff Member Delete Unsuccessfull",
                icon: "error"
            });
            loadStaff();
        },
    });
});

function saveStaff() {

    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var designation = $("#designation").val();
    var gender = $("#gender").val();
    var joined_date = $("#joined_date").val();
    var dob = $("#dob").val();
    var address1 = $("#addressLine1").val();
    var address2 = $("#addressLine2").val();
    var address3 = $("#addressLine3").val();
    var address4 = $("#addressLine4").val();
    var address5 = $("#addressLine5").val();
    var contact = $("#contact").val();
    var email = $("#email").val();
    var role = $("#role").val();

    const fieldName = $("#staff_field_details").val();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/fields/getFieldCode/${fieldName}`,
        type: "GET",
        success: function (fieldCode) {
            console.log("load field code:", fieldCode);
            $.ajax({
                url: "http://localhost:5050/greenShadowCrop/api/v1/staff",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({
                    firstName: first_name,
                    lastName: last_name,
                    designation: designation,
                    gender: gender,
                    joinedDate: joined_date,
                    dob: dob,
                    addressLine1: address1,
                    addressLine2: address2,
                    addressLine3: address3,
                    addressLine4: address4,
                    addressLine5: address5,
                    contactNo: contact,
                    email: email,
                    role: role,
                    fields: [
                        {
                            fieldCode: fieldCode
                        }
                    ],
                    vehicles: []
                }),
                success: function (result) {
                    clearStaffFields();
                    fetchStaffNames("vehicle_staff_details")
                    console.log(result);
                    Swal.fire({
                        title: "Staff Member Save",
                        text: "Staff Member Successfully Saved",
                        icon: "success"
                    });
                    loadStaff();
                },
                error: function (result) {
                    clearStaffFields();
                    Swal.fire({
                        title: "Staff Member Save",
                        text: "Staff Member Save Unsuccessfull",
                        icon: "error"
                    });
                    console.log(result);
                    loadStaff();
                },
            });

        },
        error: function (error) {
            alert("Error loading field code: " + error.responseText);
            console.error(error);
        },
    });
}

function updateStaff() {
    var staffId = $("#staff_id").val();
    var first_name = $("#first_name").val();
    var last_name = $("#last_name").val();
    var designation = $("#designation").val();
    var gender = $("#gender").val();
    var joined_date = $("#joined_date").val();
    var dob = $("#dob").val();
    var address1 = $("#addressLine1").val();
    var address2 = $("#addressLine2").val();
    var address3 = $("#addressLine3").val();
    var address4 = $("#addressLine4").val();
    var address5 = $("#addressLine5").val();
    var contact = $("#contact").val();
    var email = $("#email").val();
    var role = $("#role").val();

    const fieldName = $("#staff_field_details").val();

    $.ajax({
        url: `http://localhost:5050/greenShadowCrop/api/v1/fields/getFieldCode/${fieldName}`,
        type: "GET",
        success: function (fieldCode) {
            console.log("load field code:", fieldCode);

            const updatedStaffData = {
                firstName: first_name,
                lastName: last_name,
                designation: designation,
                gender: gender,
                joinedDate: joined_date,
                dob: dob,
                addressLine1: address1,
                addressLine2: address2,
                addressLine3: address3,
                addressLine4: address4,
                addressLine5: address5,
                contactNo: contact,
                email: email,
                role: role,
                fields: [
                    {
                        fieldCode: fieldCode
                    }
                ],
                vehicles: []
            };

            $.ajax({
                url: `http://localhost:5050/greenShadowCrop/api/v1/staff/${staffId}`,
                type: "PUT",
                contentType: "application/json",
                data: JSON.stringify(updatedStaffData),
                success: function () {
                    clearStaffFields();
                    Swal.fire({
                        title: "Staff Member Update",
                        text: "Staff Member Successfully Updated",
                        icon: "success"
                    });
                    loadStaff();
                },
                error: function (error) {
                    clearStaffFields();
                    Swal.fire({
                        title: "Staff Member Update",
                        text: "Staff Member Update Unsuccessfull",
                        icon: "error"
                    });
                    console.error(error.responseText);
                },
            });
        },
        error: function (error) {
            alert("Error loading field code: " + error.responseText);
            console.error(error);
        },
    });
}


function clearStaffFields() {
    $("#staff_id").val("");
    $("#first_name").val("");
    $("#last_name").val("");
    $("#designation").val("");
    $("#gender").val("");
    $("#joined_date").val("");
    $("#dob").val("");
    $("#addressLine1").val("");
    $("#addressLine2").val("");
    $("#addressLine3").val("");
    $("#addressLine4").val("");
    $("#addressLine5").val("");
    $("#contact").val("");
    $("#email").val("");
    $("#role").val("");
    $("#staff_field_details").val("");
    $("#vehicle_name").val("");
}