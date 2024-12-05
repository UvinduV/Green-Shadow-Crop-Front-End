$(document).ready(function () {
    loadStaff();
});
var recordIndex;

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