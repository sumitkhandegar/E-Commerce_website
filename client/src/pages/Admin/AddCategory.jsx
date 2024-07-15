import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal, Button } from "antd";

const AddCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const authURL = import.meta.env.VITE_API_URL;

  // handleSubmit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${authURL}/api/techhaven/category/add-category`, { name });
      if (data.success) {
        toast.success(`${name} is created`);
        setName('');
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // handleEdit form
  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`${authURL}/api/techhaven/category/update-category/${editId}`, { name });
      if (data.success) {
        toast.success(`${name} is updated`);
        setName('');
        getAllCategories();
        setIsModalVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // handleDelete form
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${authURL}/api/techhaven/category/delete-category/${id}`);
      if (data.success) {
        toast.success('Category Deleted');
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  // get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${authURL}/api/techhaven/category/get-category`);
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // showModal
  const showModal = (id, name) => {
    setEditId(id);
    setName(name);
    setIsModalVisible(true);
  };

  return (
    <Layout>
      <div className="flex flex-row flex-wrap m-2">
        <div className="mx-2 md:w-1/4">
          <AdminMenu />
        </div>
        <div className="bg-white shadow-md rounded-lg p-2 mx-2 md:w-1/3">
          <h4 className="text-gray-700 text-lg font-semibold mb-0">Create New Category</h4>
          <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 mx-2 md:w-1/3">
          <h4 className="text-gray-700 text-lg font-semibold mb-2">Manage Categories</h4>
          <div>
            <table className="table-auto w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left border-b-2 border-gray-300 p-2">Name</th>
                  <th className="text-left border-b-2 border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length > 0 ? (
                  categories.map((c) => (
                    <tr key={c._id}>
                      <td className="border-b border-gray-200 p-2">{c.name}</td>
                      <td className="border-b border-gray-200 p-2">
                        <button
                          className="bg-blue-500 text-white py-1 px-2 rounded"
                          onClick={() => showModal(c._id, c.name)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 ml-2 rounded"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center border-b border-gray-200 p-2">No categories available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        title="Edit Category"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <CategoryForm handleSubmit={handleEdit} value={name} setValue={setName} />
      </Modal>
      <ToastContainer />
    </Layout>
  );
};

export default AddCategory;
