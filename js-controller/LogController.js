$(document).ready(function () {
    loadLogs();
});

function loadLogs() {
    $.ajax({
        url: "http://localhost:5050/greenShadowCrop/api/v1/logs",
        method: "GET",
        contentType: "application/json",
        success: function (log) {
            console.log("Logs loaded:", log);
            $("#log-table").empty();

            log.forEach(function (log) {
                var record = `
                    <tr style="cursor: pointer">
                        <td class="log-id-value">${log.logCode}</td>
                        <td class="log-date-value">${log.logDate}</td>
                        <td class="log-details-value">${log.logDetails}</td>
                        <td class="log-image-value">
                            <img src="data:image/png;base64,${log.observedImage}" alt="log Image" style="width: 100px; height: 60px; object-fit: cover;">
                        </td>
                        <td>
                            <button class="btn btn-primary btn-sm update-button">
                                <i class="fa fa-pencil"></i>
                            </button>
                            <button class="btn btn-danger btn-sm delete-button">
                                <i class="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>`;
                $("#log-table").append(record);
            });

            $("#log-table").on("click", ".update-button", function () {
                const row = $(this).closest("tr");

                const log_id = row.find(".log-id-value").text();
                const log_date = row.find(".log-date-value").text();
                const log_details = row.find(".log-details-value").text();

                $("#log_id").val(log_id);
                $("#log_date").val(log_date);
                $("#log_desc").val(log_details);
            });
        },
        error: function (xhr, status, error) {
            console.error("Failed to load logs:", error);
            alert("An error loading the log data.");
        },
    });
}
