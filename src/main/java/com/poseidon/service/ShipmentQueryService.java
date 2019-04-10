package com.poseidon.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import com.poseidon.domain.Shipment;
import com.poseidon.domain.*; // for static metamodels
import com.poseidon.repository.ShipmentRepository;
import com.poseidon.service.dto.ShipmentCriteria;


/**
 * Service for executing complex queries for Shipment entities in the database.
 * The main input is a {@link ShipmentCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link Shipment} or a {@link Page} of {@link Shipment} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class ShipmentQueryService extends QueryService<Shipment> {

    private final Logger log = LoggerFactory.getLogger(ShipmentQueryService.class);

    private final ShipmentRepository shipmentRepository;

    public ShipmentQueryService(ShipmentRepository shipmentRepository) {
        this.shipmentRepository = shipmentRepository;
    }

    /**
     * Return a {@link List} of {@link Shipment} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<Shipment> findByCriteria(ShipmentCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Shipment> specification = createSpecification(criteria);
        return shipmentRepository.findAll(specification);
    }

    /**
     * Return a {@link Page} of {@link Shipment} which matches the criteria from the database
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<Shipment> findByCriteria(ShipmentCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Shipment> specification = createSpecification(criteria);
        return shipmentRepository.findAll(specification, page);
    }

    /**
     * Function to convert ShipmentCriteria to a {@link Specification}
     */
    private Specification<Shipment> createSpecification(ShipmentCriteria criteria) {
        Specification<Shipment> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildSpecification(criteria.getId(), Shipment_.id));
            }
            if (criteria.getTrackingCode() != null) {
                specification = specification.and(buildStringSpecification(criteria.getTrackingCode(), Shipment_.trackingCode));
            }
            if (criteria.getDate() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getDate(), Shipment_.date));
            }
            if (criteria.getDetails() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDetails(), Shipment_.details));
            }
            if (criteria.getInvoiceId() != null) {
                specification = specification.and(buildReferringEntitySpecification(criteria.getInvoiceId(), Shipment_.invoice, Invoice_.id));
            }
        }
        return specification;
    }

}
