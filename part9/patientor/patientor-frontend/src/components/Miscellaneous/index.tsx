import { Typography } from "@mui/material";
import { Male, Female, Transgender, Favorite } from "@mui/icons-material";
import { Gender, HealthCheckRating, Diagnosis } from "../../types";
import { getDiagnosisDescription } from "../../utilities";

export const GenderIcon = ({ gender }: { gender: Gender | undefined }) => {
  return (
    <>
      {gender === Gender.Male && <Male />}
      {gender === Gender.Female && <Female />}
      {gender === Gender.Other && <Transgender />}
    </>
  );
};

const HealthCheckRatingHeading = () => (
  <Typography
    component="div"
    color="text.secondary"
    fontSize={18}
    fontWeight="bold"
    paddingRight={".5em"}
  >
    Health Check Rating:
  </Typography>
);

export const HealthIcon = ({
  rating,
}: {
  rating: HealthCheckRating | undefined;
}) => {
  switch (rating) {
    case 0:
      return (
        <div style={{ display: "flex" }}>
          <HealthCheckRatingHeading />
          <Favorite sx={{ color: "green" }} />
        </div>
      );
    case 1:
      return (
        <div style={{ display: "flex" }}>
          <HealthCheckRatingHeading />
          <Favorite sx={{ color: "yellow" }} />
        </div>
      );
    case 2:
      return (
        <div style={{ display: "flex" }}>
          <HealthCheckRatingHeading />
          <Favorite sx={{ color: "orange" }} />
        </div>
      );
    case 3:
      return (
        <div style={{ display: "flex" }}>
          <HealthCheckRatingHeading />
          <Favorite sx={{ color: "black" }} />
        </div>
      );
    default:
      throw new Error("Invalid health rating");
  }
};

export const DiagnosisCodes = ({
  diagnoses,
  codes,
}: {
  diagnoses: Diagnosis[] | undefined;
  codes: string[] | undefined;
}) => {
  // this seems like a dumb way of doing this but cbf fixing atm
  // if (!codes) return null
  // if (!diagnoses) return null
  if (codes) {
    return (
      <>
        <Typography
          component="div"
          color="text.secondary"
          fontSize={18}
          fontWeight="bold"
          paddingRight={".5em"}
        >
          Diagnoses:
        </Typography>
        {codes.map((code) => (
          <div key={code}>
            <Typography
              component="ul"
              color="text.secondary"
              fontWeight="regular"
              fontSize={18}
            >
              <Typography
                component="li"
                color="text.secondary"
                fontWeight="regular"
                fontSize={16}
              >
                <span style={{ fontWeight: "bold", marginRight: ".25em" }}>
                  {code}
                </span>
                <span>{getDiagnosisDescription(diagnoses, code)}</span>
              </Typography>
            </Typography>
          </div>
        ))}
      </>
    );
  }
};
