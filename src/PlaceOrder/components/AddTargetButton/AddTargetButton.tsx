import { SvgIcon } from "@mui/material";
import { TextButton } from "shared/components/TextButton/TextButton";

export const AddTargetButton = () => {
  // const
  return (
    <TextButton>
      <SvgIcon>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="add_circle_24px">
            <path
              id="icon/content/add_circle_24px"
              d="M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM13 13H16C16.55 13 17 12.55 17 12C17 11.45 16.55 11 16 11H13V8C13 7.45 12.55 7 12 7C11.45 7 11 7.45 11 8V11H8C7.45 11 7 11.45 7 12C7 12.55 7.45 13 8 13H11V16C11 16.55 11.45 17 12 17C12.55 17 13 16.55 13 16V13Z"
              fill="currentColor"
            />
          </g>
        </svg>
      </SvgIcon>
      Add profit target ()
    </TextButton>
  );
};
