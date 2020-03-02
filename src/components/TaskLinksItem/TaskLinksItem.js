import React from "react";
import moment from "moment";
import { FaLink } from "react-icons/fa";

import {
  LinkBody,
  LinkPlaceholder,
  LinkDetailWrapper,
  LinkDetail,
  LinkDescription,
  LinkIcon
} from "./TaskLinksItem.styles";

const TaskLinksItem = ({ link }) => {
  return (
    <LinkBody>
      <LinkDetailWrapper>
        <LinkIcon>
          <FaLink />
          <LinkPlaceholder>
            <a href={link.link} target={"_blank"}>
              {link.link}
            </a>
          </LinkPlaceholder>
        </LinkIcon>
        <LinkDetail>
          {moment(link.date).format("dddd, MMM Do, 'YY.")}
        </LinkDetail>
      </LinkDetailWrapper>
      <LinkDescription>{link.title}</LinkDescription>
    </LinkBody>
  );
};

export default TaskLinksItem;
