package com.safar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReservationDTO {

    @NotNull(message = "Bus ID is required")
    private Integer busId;

    @NotNull(message = "User ID is required")
    private Integer userId;

    @NotNull(message = "Source is required")
    @NotBlank(message = "Source cannot be blank")
    private String source;

    @NotNull(message = "Destination is required")
    @NotBlank(message = "Destination cannot be blank")
    private String destination;

    @NotNull(message = "Journey Date is required")
    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private LocalDate journeyDate;

    @NotNull(message = "Booked seat count is required")
    @Min(value = 1, message = "At least one seat must be booked")
    private Integer bookedSeat;
}
