import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useOutletContext } from "react-router-dom";

const ChannelList = () => {
  const navigate = useNavigate();
  const { channels = [], setChannels } = useOutletContext();

  // use state to toggle the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  // form validation schema with yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .max(50, "Channel name must be 50 characters or less")
      .required("Channel name is required"),
    description: Yup.string()
      .max(200, "Description must be 200 characters or less")
      .required("Description is required"),
  });

  // formik initialize
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      // add new channel and reset my form
      const newChannel = { id: Date.now(), ...values };
      setChannels((prevChannels) => [...prevChannels, newChannel]);

      resetForm();
      setIsFormVisible(false); 
    },
  });

  return (
    <div>
      <h2>Channel List</h2>

      {/* button to toggle form*/}
      <button onClick={() => setIsFormVisible((prev) => !prev)}>
        {isFormVisible ? "Cancel" : "Add Channel"}
      </button>

      {/* my form */}
      {isFormVisible && (
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor="name">Channel Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div style={{ color: "red" }}>{formik.errors.name}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div style={{ color: "red" }}>{formik.errors.description}</div>
            ) : null}
          </div>
          <button type="submit">Create Channel</button>
        </form>
      )}
    {/* mapping through my channels*/}
      <ul>
        {channels.length > 0 ? (
          channels.map((channel) => (
            <li key={channel.id}>
              <h2>{channel.title || channel.name}</h2>
              <p>{channel.description}</p>
              <button
                onClick={() =>
                  navigate(`/channels/${channel.id}`, { state: channel })
                }
              >
                View Channel
              </button>
            </li>
          ))
        ) : (
          <p>No channels available</p>
        )}
      </ul>
    </div>
  );
};

export default ChannelList;
