export default {
  getHHANameQuery: () => {
    const brandValue = BrandSelect.selectedOptionValue;
    
    let query = `
SELECT DISTINCT
    concat("HHA CCN", ' - ', if(notEmpty("HHA DBA"), "HHA DBA", "HHA Name")) as display_name,
    "HHA CCN" as hha_id
FROM hha_analytics.hha_mapping
`;
    
    // Add WHERE clause if brand is selected
    if (brandValue && brandValue !== '') {
      // Escape single quotes for SQL safety
      const escapedBrand = brandValue.replace(/'/g, "''");
      query += `WHERE \`HHA Brand Name\` = '${escapedBrand}'\n`;
    }
    
    query += `ORDER BY display_name ASC
FORMAT JSON`;
    
    return query;
  }
}