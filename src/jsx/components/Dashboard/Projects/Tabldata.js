import user4 from '../../../../images/users/4.png';
import user5 from '../../../../images/users/5.png';
import user6 from '../../../../images/users/6.png';
import user7 from '../../../../images/users/7.png';
import user8 from '../../../../images/users/8.png';
import user9 from '../../../../images/users/9.png';
import user13 from '../../../../images/users/13.png';
import user14 from '../../../../images/users/14.png';

const patientTable = {
  data: [
    {
      id: '#P-000441425',
      title: 'Build Branding Persona for Etza.id',
      dat: 'Monday, Dec 28th 2020',
      Cimg: user4,
      st: 'Kevin Sigh',
      act: 'Pending',
      Pimg: user14,
      t6: '',
    },

    {
      id: '#P-000441426',
      title: 'Manage SEO for Eclan Company P..',
      dat: 'Tuesday, Dec 29th 2020',
      Cimg: user5,
      st: 'Endge Aes',
      act: 'Process',
      Pimg: user13,
      t6: '',
    },

    {
      id: '#P-000441427',
      title: 'Redesign Kripton Mobile App',
      dat: 'Wednesday, Dec 30th 2020',
      Cimg: user6,
      st: 'Alex Noer',
      act: 'Closed',
      Pimg: user9,
      t6: '',
    },

    {
      id: '#P-000441428',
      title: 'Manage SEO for Eclan Company P..',
      dat: 'Tuesday, Dec 29th 2020',
      Cimg: user7,
      st: 'Endge Aes',
      act: 'Closed',
      Pimg: user4,
      t6: '',
    },

    {
      id: '#P-000441429',
      title: 'Build Branding Persona for Etza.id',
      dat: 'Monday, Dec 28th 2020',
      Cimg: user8,
      st: 'Kevin Sigh',
      act: 'Pending',
      Pimg: user5,
      t6: '',
    },

    {
      id: '#P-000441430',
      title: 'Redesign Kripton Mobile App',
      dat: 'Wednesday, Dec 30th 2020',
      Cimg: user9,
      st: 'Alex Noer',
      act: 'Closed',
      Pimg: user6,
      t6: '',
    },

    {
      id: '#P-000441431',
      title: 'Build Branding Persona for Etza.id',
      dat: 'Monday, Dec 28th 2020',
      Cimg: user13,
      st: 'Kevin Sigh',
      act: 'Pending',
      Pimg: user7,
      t6: '',
    },

    {
      id: '#P-000441432',
      title: 'Manage SEO for Eclan Company P..',
      dat: 'Tuesday, Dec 29th 2020',
      Cimg: user14,
      st: 'Endge Aes',
      act: 'Closed',
      Pimg: user8,
      t6: '',
    },

    {
      id: '#P-000441433',
      title: 'Redesign Kripton Mobile App',
      dat: 'Wednesday, Dec 30th 2020',
      Cimg: user4,
      st: 'Alex Noer',
      act: 'Closed',
      Pimg: user14,
      t6: '',
    },

    {
      id: '#P-000441434',
      title: 'Build Branding Persona for Etza.id',
      dat: 'Monday, Dec 28th 2020',
      Cimg: user5,
      st: 'Kevin Sigh',
      act: 'Pending',
      Pimg: user9,
      t6: '',
    },

    {
      id: '#P-000441435',
      title: 'Manage SEO for Eclan Company P..',
      dat: 'Tuesday, Dec 29th 2020',
      Cimg: user6,
      st: 'Endge Aes',
      act: 'Process',
      Pimg: user4,
      t6: '',
    },

    {
      id: '#P-000441436',
      title: 'Redesign Kripton Mobile App',
      dat: 'Wednesday, Dec 30th 2020',
      Cimg: user7,
      st: 'Alex Noer',
      act: 'Closed',
      Pimg: user5,
      t6: '',
    },

    {
      id: '#P-000441437',
      title: 'Redesign Kripton Mobile App',
      dat: 'Monday, Dec 28th 2020',
      Cimg: user8,
      st: 'Kevin Sigh',
      act: 'Closed',
      Pimg: user6,
      t6: '',
    },
  ],
  columns: ['Order ID', 'Deadline', 'Client', 'Customers', 'Action', ''],
};

const pendingPatient = [];
const processPatient = [];
const closePatient = [];
patientTable.data.map((d, i) =>
  d.act === 'Pending'
    ? pendingPatient.push(d)
    : d.act === 'Process'
    ? processPatient.push(d)
    : d.act === 'Closed'
    ? closePatient.push(d)
    : '',
);

const data = {
  //profileTable,
  //pendingData,
  patientTable,
  pendingPatient,
  processPatient,
  closePatient,
  //productData,
  //customers,
};

export default data;
