import { esResourceIndex } from '#src/config/env';
import { commonResolver } from '#src/graphql/common/resolvers';
import { esClient } from '#src/services/elasticsearch';
import buildQuery, { QueryOptions } from '#src/services/elasticsearch/buildQuery';

export const resourceResolver = async (parent, args) => {
  try {
    const { hits, total } = await commonResolver(args, esResourceIndex);
    return { hits, total };
  } catch (error) {
    console.error('resourceResolver error', error);
    return null;
  }
};

export const resourceCountResolver = async (parent, args) => {
  try {
    const resSearch = await esClient.count({
      index: esResourceIndex,
    });

    const count = resSearch?.body?.count;
    return count;
  } catch (error) {
    console.error('resourceCountResolver error', error);
    return null;
  }
};

export const resourceStatsResolver = async (parent, args) => {
  try {
    const filterByWarehouse = [{ field: 'rs_type', value: 'warehouse' }];
    const filterByResearchProject = [{ field: 'rs_type', value: 'research_project' }];
    const filterByEQP = [{ field: 'rs_type', value: 'eqp' }];
    const filterBySourceSystem = [{ field: 'rs_type', value: 'source_system' }];

    const queryOptions: QueryOptions = {
      fields: ['stat_etl', 'rs_type', 'rs_id'],
    };
    const getBody = (filterBy) => buildQuery({ ...queryOptions, match: filterBy, pagination: { size: 1000 } });

    const [resWarehouse, resResearchProject, resEQP, resSourceSystem] = await Promise.all([
      esClient.search({ index: esResourceIndex, body: getBody(filterByWarehouse) }),
      esClient.search({ index: esResourceIndex, body: getBody(filterByResearchProject) }),
      esClient.search({ index: esResourceIndex, body: getBody(filterByEQP) }),
      esClient.search({ index: esResourceIndex, body: getBody(filterBySourceSystem) }),
    ]);

    const sources = {
      warehouse: resWarehouse?.body?.hits?.hits?.map((hit) => hit._source),
      research_project: resResearchProject?.body?.hits?.hits?.map((hit) => hit._source),
      eqp: resEQP?.body?.hits?.hits?.map((hit) => hit._source),
      source_system: resSourceSystem?.body?.hits?.hits?.map((hit) => hit._source),
    };

    const statEtl = {
      warehouse: {
        project_count: sources.warehouse
          .map((warehouse) => warehouse.stat_etl.project_count)
          .reduce((a, b) => a + b, 0),
        domain_count: sources.warehouse.map((warehouse) => warehouse.stat_etl.domain_count).reduce((a, b) => a + b, 0),
        source_system_count: sources.warehouse
          .map((warehouse) => warehouse.stat_etl.source_system_count)
          .reduce((a, b) => a + b, 0),
        variable_count: sources.warehouse
          .map((warehouse) => warehouse.stat_etl.variable_count)
          .reduce((a, b) => a + b, 0),
        table_count: sources.warehouse.map((warehouse) => warehouse.stat_etl.table_count).reduce((a, b) => a + b, 0),
      },
      research_project: {
        project_count: sources.research_project.length,
        domain_count: sources.research_project
          .map((research_project) => research_project.stat_etl.domain_count)
          .reduce((a, b) => a + b, 0),
        source_system_count: sources.research_project
          .map((research_project) => research_project.stat_etl.source_system_count)
          .reduce((a, b) => a + b, 0),
        variable_count: sources.research_project
          .map((research_project) => research_project.stat_etl.variable_count)
          .reduce((a, b) => a + b, 0),
        table_count: sources.research_project
          .map((research_project) => research_project.stat_etl.table_count)
          .reduce((a, b) => a + b, 0),
      },
      eqp: {
        project_count: sources.eqp.length,
        domain_count: sources.eqp.map((eqp) => eqp.stat_etl.domain_count).reduce((a, b) => a + b, 0),
        source_system_count: sources.eqp.map((eqp) => eqp.stat_etl.source_system_count).reduce((a, b) => a + b, 0),
        variable_count: sources.eqp.map((eqp) => eqp.stat_etl.variable_count).reduce((a, b) => a + b, 0),
        table_count: sources.eqp.map((eqp) => eqp.stat_etl.table_count).reduce((a, b) => a + b, 0),
      },
      source_system: {
        project_count: sources.source_system.length,
        domain_count: sources.source_system
          .map((source_system) => source_system.stat_etl.domain_count)
          .reduce((a, b) => a + b, 0),
        source_system_count: sources.source_system
          .map((source_system) => source_system.stat_etl.source_system_count)
          .reduce((a, b) => a + b, 0),
        variable_count: sources.source_system
          .map((source_system) => source_system.stat_etl.variable_count)
          .reduce((a, b) => a + b, 0),
        table_count: sources.source_system
          .map((source_system) => source_system.stat_etl.table_count)
          .reduce((a, b) => a + b, 0),
      },
    };

    return statEtl;
  } catch (error) {
    console.error('resourceStatsResolver error', error);
    return null;
  }
};
